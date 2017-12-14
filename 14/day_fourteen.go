package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type coordinate struct {
	x int
	y int
}

func (c *coordinate) left() *coordinate {
	return &coordinate{c.x - 1, c.y}
}

func (c *coordinate) right() *coordinate {
	return &coordinate{c.x + 1, c.y}
}

func (c *coordinate) up() *coordinate {
	return &coordinate{c.x, c.y - 1}
}

func (c *coordinate) down() *coordinate {
	return &coordinate{c.x, c.y + 1}
}

type accumulator struct {
	history map[coordinate]bool
	regions [][]coordinate
	current []coordinate
}

func (a *accumulator) visited(c coordinate) bool {
	_, exists := a.history[c]
	return exists
}

func (a *accumulator) add(c coordinate) {
	a.history[c] = true
	a.current = append(a.current, c)
}

func (a *accumulator) next() {
	if len(a.current) > 0 {
		a.regions = append(a.regions, a.current)
		a.current = []coordinate{}
	}
}

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
		grid := createGrid(line)
		result = append(result, fmt.Sprintf("%d", countRegions(grid)))
	}
	return
}

func countRegions(grid []string) int {
	history := accumulator{map[coordinate]bool{}, [][]coordinate{}, []coordinate{}}
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[i]); j++ {
			findRegion(&history, grid, &coordinate{i, j})
			history.next()
		}
	}
	return len(history.regions)
}

func findRegion(history *accumulator, grid []string, point *coordinate) bool {
	if point.x < 0 || point.x >= len(grid) || point.y < 0 || point.y >= len(grid[point.x]) {
		return false
	}
	if grid[point.x][point.y] == 48 {
		return false
	}
	if history.visited(*point) {
		return false
	}
	history.add(*point)
	return findRegion(history, grid, point.left()) || findRegion(history, grid, point.right()) || findRegion(history, grid, point.up()) || findRegion(history, grid, point.down())
}

func createGrid(input []byte) []string {
	grid := []string{}
	for i := 0; i < 128; i++ {
		rowInput := append(input, []byte(fmt.Sprintf("-%d", i))...)
		rowInput = append(rowInput, 17, 31, 73, 47, 23)
		hash := hash(256, rowInput)
		grid = append(grid, createRow(hash))
	}
	return grid
}

func createRow(input string) string {
	row := ""
	for _, x := range strings.Split(input, "") {
		digit, _ := strconv.ParseInt(x, 16, 32)
		row += fmt.Sprintf("%04b", digit)
	}
	return row
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
	hash := ""
	for i := 0; i < 16; i++ {
		block := list[16*i]
		for j := 1; j < 16; j++ {
			block ^= list[16*i+j]
		}
		hash = fmt.Sprintf("%s%02x", hash, block)
	}
	return hash
}

func hash(size int64, input []byte) string {
	list := list(size)
	scramble(list, size, input)
	return createHash(list)
}
