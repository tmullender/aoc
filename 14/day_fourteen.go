package main

import (
	"bufio"
	"fmt"
	"log"
	"math/bits"
	"os"
	"strconv"
	"strings"
)

func main() {
	run(os.Stdin)
}

func runPath(filepath string) []string {
	file, _ := os.Open(filepath)
	defer file.Close()
	return run(file)
}

func run(file *os.File) (result []string) {
	reader := bufio.NewScanner(file)
	for reader.Scan() {
		line := reader.Bytes()
		log.Println(line)
		count := count(line)
		result = append(result, fmt.Sprintf("%d", count))
	}
	return
}

func count(input []byte) int {
	count := 0
	for i := 0; i < 128; i++ {
		rowInput := append(input, []byte(fmt.Sprintf("-%d", i))...)
		rowInput = append(rowInput, 17, 31, 73, 47, 23)
		hash := hash(256, rowInput)
		count += countBits(hash)
	}
	return count
}

func countBits(input string) int {
	count := 0
	for _, x := range strings.Split(input, "") {
		digit, _ := strconv.ParseUint(x, 16, 32)
		count += bits.OnesCount64(digit)
	}
	return count
}

func list(size int64) []int {
	list := make([]int, size)
	for i := range list {
		list[i] = i
	}
	return list
}

func scramble(list []int, size int64, input []byte) {
	skip := 0
	position := 0
	for l := 0; l < 64; l++ {
		for _, next := range input {
			length := int(next)
			for i := 0; i < length/2; i++ {
				j := (position + i) % int(size)
				k := (position + length - i - 1) % int(size)
				list[j], list[k] = list[k], list[j]
			}
			position += length + skip
			skip++
		}
	}
}

func createHash(list []int) string {
	hashString := ""
	for i := 0; i < 16; i++ {
		block := list[16*i]
		for j := 1; j < 16; j++ {
			block ^= list[16*i+j]
		}
		hashString = fmt.Sprintf("%s%02x", hashString, block)
	}
	return hashString
}

func hash(size int64, input []byte) string {
	list := list(size)
	scramble(list, size, input)
	return createHash(list)
}
