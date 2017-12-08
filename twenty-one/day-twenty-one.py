#! /usr/bin/env python

import sys, re


SWAP_POSITION = re.compile("swap position (\d+) with position (\d+)")
SWAP_LETTER = re.compile("swap letter ([A-z]) with letter ([A-z])")
ROTATE_STEPS = re.compile("rotate ([A-z]+) (\d+) steps?")
ROTATE_POSITION = re.compile("rotate based on position of letter ([A-z]+)")
REVERSE_POSITION = re.compile("reverse positions (\d+) through (\d+)")
MOVE_POSITION = re.compile("move position (\d+) to position (\d+)")


def swap_position(match, s):
    x = int(match.group(1))
    y = int(match.group(2))
    a = s[x]
    b = s[y]
    result = s[:x] + b + s[x+1:]
    return result[:y] + a + result[y+1:]


def swap_letter(match, s):
    x = match.group(1)
    y = match.group(2)
    return s.replace(x, "#").replace(y, x).replace("#", y)


def rotate_steps(match, s):
    direction = match.group(1)
    multiplier = 1 if direction == "left" else -1
    steps = int(match.group(2)) * multiplier
    return rotate(steps, s)


def rotate(steps, string):
    result = ""
    length = len(string)
    for i in range(0, length):
        result += string[(i + steps) % length]
    return result


def rotate_position(match, string):
    char = match.group(1)
    steps = string.index(char) + 1
    if steps >= 5:
        steps += 1
    return rotate(-1 * steps, string)


def reverse_position(match, string):
    x = int(match.group(1))
    y = int(match.group(2))
    reverse = string[x:y+1]
    return string[:x] + reverse[::-1] + string[y+1:]


def move_position(match, string):
    x = int(match.group(1))
    y = int(match.group(2))
    move = string[x]
    removed = string[:x] + string[x + 1:]
    return removed[:y] + move + removed[y:]


OPTIONS = {
    SWAP_POSITION: swap_position,
    SWAP_LETTER: swap_letter,
    ROTATE_STEPS: rotate_steps,
    ROTATE_POSITION: rotate_position,
    REVERSE_POSITION: reverse_position,
    MOVE_POSITION: move_position
}


def process(string, instruction):
    updated = string
    for pattern in OPTIONS:
        match = pattern.match(instruction)
        if match:
            updated = OPTIONS[pattern](match, string)
            break
    return updated


if __name__ == "__main__":
    INITIAL = "abcdefgh"
    password = INITIAL
    with open(sys.argv[1], 'r') as reader:
        for line in reader.readlines():
            password = process(password, line)
    print password
