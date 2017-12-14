package main

import (
	"fmt"
	"testing"
)

func TestExample(t *testing.T) {
	result := runPath("day_fourteen.example")
	fmt.Println(result)
	if result[0] != "1242" {
		t.Fail()
	}
}

func TestInput(t *testing.T) {
	result := runPath("day_fourteen.input")
	fmt.Println(result)
	if result[0] != "1103" {
		t.Fail()
	}
}
