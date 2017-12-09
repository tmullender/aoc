package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

const groupStart = '{'
const groupEnd = '}'
const garbageStart = '<'
const garbageEnd = '>'
const ignore = '!'

func main() {
	run(os.Stdin)
}

func runPath(filepath string) {
	file, _ := os.Open(filepath)
	run(file)
	file.Close()
}

func run(file *os.File) {
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		log.Println(line)
		fmt.Println(totalScore(line))
	}
}

func totalScore(line string) int {
	score := 0
	garbage := false
	skipping := false
	for _, c := range line {
		if skipping {
			skipping = false
			continue
		}
		if c == ignore {
			skipping = true
			continue
		}
		if c == garbageEnd {
			garbage = false
		}
		if garbage {
			score++
		}
		if c == garbageStart {
			garbage = true
		}
	}
	return score
}
