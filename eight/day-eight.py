#! /usr/bin/env python

import sys

SCREEN = [[0 for x in range(0, 50)] for y in range(0, 6)]


def rectangle(arguments):
    size = map(int, arguments[0].split("x"))
    for i in range(0, size[0]):
        for j in range(0, size[1]):
            SCREEN[j][i] = 1


def rotate(arguments):
    moves = int(arguments[3])
    direction = arguments[0]
    index = int(arguments[1][2:])
    if direction == "row":
        rotate_row(index, moves)
    else:
        rotate_column(index, moves)


def rotate_row(index, moves):
    initial = SCREEN[index]
    SCREEN[index] = initial[-moves:]+initial[:-moves]


def rotate_column(index, moves):
    size = range(0, len(SCREEN))
    initial = [SCREEN[i][index] for i in size]
    rotated = initial[-moves:]+initial[:-moves]
    for i in size:
        SCREEN[i][index] = rotated[i]


COMMANDS = {
    "rect": rectangle,
    "rotate": rotate
}


def print_screen():
    for row in SCREEN:
        print row
    print '\n'


def parse_file(filepath):
    count = 0
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            command = line.split(" ")
            COMMANDS[command[0]](command[1:])
    for line in SCREEN:
        count += sum(line)
    return count


if __name__ == "__main__":
    print_screen()
    print parse_file(sys.argv[1])
    print_screen()