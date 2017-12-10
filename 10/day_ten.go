package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	length, _ := strconv.ParseInt(os.Args[0], 0, 64)
	run(length, os.Stdin)
}

func runPath(length int64, filepath string) {
	file, _ := os.Open(filepath)
	run(length, file)
	file.Close()
}

func run(length int64, file *os.File) {
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line := scanner.Bytes()
		line = append(line, 17, 31, 73, 47, 23)
		log.Println(line)
		fmt.Println(hash(length, line))
	}
}

func list(size int64) []int {
	list := make([]int, size)
	for i := range list {
		list[i] = i
	}
	return list
}

func scramble(list *[]int, size int64, input []byte) {
	skip := 0
	position := 0
	for l := 0; l < 64; l++ {
		for _, next := range input {
			length := int(next)
			for i := 0; i < length/2; i++ {
				j := (position + i) % int(size)
				k := (position + length - i - 1) % int(size)
				(*list)[j], (*list)[k] = (*list)[k], (*list)[j]
			}
			position += length + skip
			skip++
		}
	}
}

func createHash(list *[]int) string {
	hash := ""
	for i := 0; i < 16; i++ {
		block := (*list)[16*i]
		for j := 1; j < 16; j++ {
			block ^= (*list)[16*i+j]
		}
		hash = fmt.Sprintf("%s%02x", hash, block)
	}
	return hash
}

func hash(size int64, input []byte) string {
	list := list(size)
	scramble(&list, size, input)
	return createHash(&list)
}
