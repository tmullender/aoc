#! /usr/bin/env python

import sys

REGISTERS = {"a": 0, "b": 0, "c": 1, "d": 0}


def copy(instruction):
    register = instruction[0]
    if register in REGISTERS:
        REGISTERS[instruction[1]] = REGISTERS[register]
    else:
        REGISTERS[instruction[1]] = int(register)
    return 1


def inc(instruction):
    REGISTERS[instruction[0]] += 1
    return 1


def dec(instruction):
    REGISTERS[instruction[0]] -= 1
    return 1


def jump(instruction):
    register = instruction[0]
    if register in REGISTERS:
        value = REGISTERS[register]
    else:
        value = int(register)
    return int(instruction[1]) if value != 0 else 1


INSTRUCTIONS = {
    "cpy": copy,
    "inc": inc,
    "dec": dec,
    "jnz": jump
}


def parse_file(file_path):
    with open(file_path, 'r') as reader:
        lines = reader.readlines()
        index = 0
        while index < len(lines):
            instruction = lines[index].split()
            offset = INSTRUCTIONS[instruction[0]](instruction[1:])
            index += offset


if __name__ == "__main__":
    parse_file(sys.argv[1])
    print REGISTERS