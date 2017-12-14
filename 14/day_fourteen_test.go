package main

import (
	"fmt"
	"testing"
)

func TestExample(t *testing.T) {
	result := runPath("day_fourteen.example")
	if result[0] != "8108" {
		t.Fail()
	}
}

func TestInput(t *testing.T) {
	result := runPath("day_fourteen.input")
	fmt.Println(result)
	if result[0] != "8230" {
		t.Fail()
	}
}
