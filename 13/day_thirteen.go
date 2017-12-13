package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type scanner struct {
	position int
	scope    int
	forward  bool
}

func (s *scanner) move() {
	if s.forward {
		if s.position < s.scope-1 {
			s.position++
		} else {
			s.forward = false
			s.position--
		}
	} else {
		if s.position > 0 {
			s.position--
		} else {
			s.forward = true
			s.position++
		}
	}
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
	reader := bufio.NewScanner(file)
	scanners := map[int]*scanner{}
	max := 0
	for reader.Scan() {
		line := reader.Text()
		details := strings.Split(line, ": ")
		layer, _ := strconv.ParseInt(details[0], 0, 32)
		scope, _ := strconv.ParseInt(details[1], 0, 32)
		max = int(layer)
		scanners[int(layer)] = &scanner{0, int(scope), true}
	}
	fmt.Println(timeToGo(max, scanners))
}

func timeToGo(layers int, scanners map[int]*scanner) int {
	delay := 0
	for true {
		if isClear(layers, copy(scanners)) {
			return delay
		}
		moveAll(scanners)
		delay++
	}
	return -1
}

func copy(scanners map[int]*scanner) map[int]*scanner {
	result := map[int]*scanner{}
	for k, v := range scanners {
		w := *v
		result[k] = &w
	}
	return result
}

func isClear(layers int, scanners map[int]*scanner) bool {
	for i := 0; i <= layers; i++ {
		if scannr, exists := scanners[i]; exists && (*scannr).position == 0 {
			return false
		}
		moveAll(scanners)
	}
	return true
}

func moveAll(scanners map[int]*scanner) {
	for _, scannr := range scanners {
		(*scannr).move()
	}
}
