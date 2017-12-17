package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"testing"
)

func TestExample(t *testing.T) {
	result := runPath("abcde", "day_sixteen.example", 2)
	fmt.Println(result)
	if result[0] != "ceadb" {
		t.Fail()
	}
}

func TestInput(t *testing.T) {
	result := runPath("abcdefghijklmnop", "day_sixteen.input", 1000000000)
	fmt.Println(result)
	if result[0] != "odiabmplhfgjcekn" {
		t.Fail()
	}
}

func BenchmarkProcess(b *testing.B) {
	initial := "abcdefghijklmnop"
	instructions, _ := ioutil.ReadFile("day_sixteen.input")
	functions := createFunctions(len(initial), strings.Split(string(instructions), ","))
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		process(initial, functions, 10000)
	}
}
