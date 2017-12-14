package main

import (
	"fmt"
	"testing"
)

func TestExample(t *testing.T) {
	result := runPath("day_eight.example")
	if result[0] != "10" {
		t.Fail()
	}
}

func TestInput(t *testing.T) {
	result := runPath("day_eight.input")
	fmt.Println(result)
	if result[0] != "6347" {
		t.Fail()
	}
}
