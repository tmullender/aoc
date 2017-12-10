package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

const pattern = "([a-z]+) (dec|inc) (-?[0-9]+) if ([a-z]+) ([!><=]+) (-?[0-9]+)"

type mapWithDefault map[string]int64

func (mapp *mapWithDefault) get(key string) int64 {
	if value, exists := (*mapp)[key]; exists {
		return value
	}
	return 0
}

func main() {
	run(os.Stdin)
}

func inc(input int64, offset int64) int64 {
	return input + offset
}

func dec(input int64, offset int64) int64 {
	return input - offset
}

func eq(a int64, b int64) bool {
	return a == b
}

func ne(a int64, b int64) bool {
	return a != b
}

func gt(a int64, b int64) bool {
	return a > b
}

func ge(a int64, b int64) bool {
	return a >= b
}

func lt(a int64, b int64) bool {
	return a < b
}

func le(a int64, b int64) bool {
	return a <= b
}

func getInstruction(instruction string) func(int64, int64) int64 {
	if instruction == "inc" {
		return inc
	}
	return dec
}

func getConditional(conditional string) func(int64, int64) bool {
	result := eq
	switch conditional {
	case "==":
		result = eq
	case "!=":
		result = ne
	case ">":
		result = gt
	case "<":
		result = lt
	case ">=":
		result = ge
	case "<=":
		result = le
	}

	return result
}

func evaluate(registers *mapWithDefault, expression []string) int64 {
	log.Println(expression)
	register := expression[0]
	instruction := getInstruction(expression[1])
	offset, _ := strconv.ParseInt(expression[2], 0, 64)
	updated := instruction((*registers).get(register), offset)
	(*registers)[register] = updated
	return updated
}

func condition(registers *mapWithDefault, conditions []string) bool {
	log.Println(conditions)
	a := (*registers).get(conditions[0])
	b, _ := strconv.ParseInt(conditions[2], 0, 64)
	conditional := getConditional(conditions[1])
	log.Printf("%d %T %d", a, conditional, b)
	return conditional(a, b)
}

func runPath(filepath string) {
	file, _ := os.Open(filepath)
	run(file)
	file.Close()
}

func run(file *os.File) {
	registers := mapWithDefault(map[string]int64{})
	regex := regexp.MustCompile(pattern)
	scanner := bufio.NewScanner(file)
	max := int64(0)
	for scanner.Scan() {
		line := scanner.Text()
		log.Println(line)
		matches := regex.FindStringSubmatch(line)
		if condition(&registers, matches[4:]) {
			value := evaluate(&registers, matches[1:4])
			if value > max {
				max = value
			}
		}
	}
	fmt.Printf("%d\n", max)
}
