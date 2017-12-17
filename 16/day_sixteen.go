package main

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	result := runPath("abcdefghijklmnop", "day_sixteen.input", 1000000000)
	fmt.Println(result[0])
}

func runPath(initial string, filepath string, count int) []string {
	file, _ := os.Open(filepath)
	defer file.Close()
	return run(initial, file, count)
}

func run(initial string, file *os.File, count int) (result []string) {
	reader := bufio.NewScanner(file)
	for reader.Scan() {
		line := reader.Text()
		result = append(result, processInstructions(initial, line, count))
	}
	return
}

func exchange(positions []byte, a int, b int) {
	c := positions[a]
	positions[a] = positions[b]
	positions[b] = c
}

func partner(positions []byte, a byte, b byte) {
	exchange(positions, bytes.IndexByte(positions, a), bytes.IndexByte(positions, b))
}

func processInstructions(initial string, line string, count int) string {
	length := len(initial)
	instructions := strings.Split(line, ",")
	functions := createFunctions(length, instructions)
	log.Printf("%d instructions found\n", len(functions))
	offset, positions := process(initial, functions, count)
	offset = pickWrapper(length)(offset)
	return string(append(positions[offset:], positions[0:offset]...))
}

func process(initial string, functions []func(int, []byte) int, count int) (int, []byte) {
	positions := []byte(initial)
	history := map[string]string{}
	offset := 0
	for i := 0; i < count; i++ {
		before := string(positions)
		if found, exists := history[before]; exists {
			positions = []byte(found)
		} else {
			for _, f := range functions {
				offset = f(offset, positions)
			}
			after := string(positions)
			history[before] = after
		}
	}
	return offset, positions
}

func createFunctions(length int, instructions []string) []func(int, []byte) int {
	functions := []func(int, []byte) int{}
	wrap := pickWrapper(length)
	for _, instruction := range instructions {
		switch instruction[0] {
		case 's':
			size, _ := strconv.ParseUint(instruction[1:], 10, 32)
			delta := length - int(size)
			functions = append(functions, func(offset int, input []byte) int {
				return delta + offset
			})
		case 'p':
			inputs := []byte(instruction[1:])
			functions = append(functions, func(offset int, input []byte) int {
				partner(input, inputs[0], inputs[2])
				return offset
			})
		case 'x':
			inputs := strings.Split(instruction[1:], "/")
			a, _ := strconv.ParseUint(inputs[0], 10, 32)
			b, _ := strconv.ParseUint(inputs[1], 10, 32)
			ia, ib := int(a), int(b)
			functions = append(functions, func(offset int, input []byte) int {
				exchange(input, wrap(offset+ia), wrap(offset+ib))
				return offset
			})
		}
	}
	return functions
}

func pickWrapper(length int) func(int) int {
	shift := length - 1
	if (length & shift) == 0 {
		return func(i int) int {
			return i & shift
		}
	}
	return func(i int) int {
		return i % length
	}
}
