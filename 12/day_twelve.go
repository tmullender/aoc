package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type mapOfLists map[string]*[]string

type set map[string]bool

func (s *set) add(i string) {
	(*s)[i] = true
}

func (s *set) intersect(o *[]string) *[]string {
	i := []string{}
	for _, v := range *o {
		if _, exists := (*s)[v]; !exists {
			i = append(i, v)
		}
	}
	return &i
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
	programs := mapOfLists{}
	for scanner.Scan() {
		line := scanner.Text()
		log.Println(line)
		connection := strings.Split(line, " <-> ")
		connections := strings.Split(connection[1], ", ")
		programs[connection[0]] = &connections
	}
	fmt.Println(countGroup("0", &programs))
}

func countGroup(program string, programs *mapOfLists) int {
	inGroup := set{}
	group(program, &inGroup, programs)
	return len(inGroup)
}

func group(program string, acc *set, all *mapOfLists) {
	acc.add(program)
	for _, i := range *acc.intersect((*all)[program]) {
		group(i, acc, all)
	}
}
