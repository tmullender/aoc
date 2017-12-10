package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
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
	for scanner.Scan() {
		line := scanner.Text()
		log.Println(line)
		fmt.Println(hash(length, line))
	}
}

func hash(size int64, input string) int {
	list := make([]int, size)
	for i := range list {
		list[i] = i
	}
	skip := 0
	position := 0
	for _, next := range strings.Split(input, ",") {
		length, _ := strconv.ParseInt(next, 0, 64)
		for i := 0; i < int(length)/2; i++ {
			j := (position + i) % int(size)
			k := (position + int(length) - i - 1) % int(size)
			list[j], list[k] = list[k], list[j]
		}
		position += int(length) + skip
		skip++
	}
	return list[0] * list[1]
}
