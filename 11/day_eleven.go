package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strings"
)

type mapWithZeroes map[string]int

func (m *mapWithZeroes) get(key string) int {
	if value, exists := (*m)[key]; exists {
		return value
	}
	return 0
}

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
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line := scanner.Text()
		log.Println(line)
		fmt.Println(shortestPath(line))
	}
}

func shortestPath(input string) int {
	directions := strings.Split(input, ",")
	counts := mapWithZeroes{}
	for _, direction := range directions {
		counts[direction] = counts.get(direction) + 1
	}
	return countSteps(&counts)
}

func abs(input int) int {
	if input < 0 {
		return input * -1
	}
	return input
}

func min(a int, b int) int {
	if b < a {
		return b
	}
	return a
}

func countSteps(counts *mapWithZeroes) int {
	n := counts.get("n") - counts.get("s")
	ne := counts.get("ne") - counts.get("sw")
	nw := counts.get("nw") - counts.get("se")
	log.Printf("N:%d NE:%d NW:%d\n", n, ne, nw)
	all := []int{n, ne, nw}
	sort.Ints(all)
	if (ne < 0 && nw < 0 && n >= 0) || (n <= 0 && ne > 0 && nw > 0) {
		return min(abs(ne), abs(nw)) + abs(ne-nw) + n
	}
	return all[1] + all[2]
}
