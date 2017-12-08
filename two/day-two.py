#! env python

import sys

SIZE = 4
#GRID = [[1, 2, 3],[4, 5, 6],[7, 8, 9]]
GRID = [
    ["X", "X", 1, "X", "X"],
    ["X", 2, 3, 4, "X"],
    [5, 6, 7, 8, 9],
    ["X", "A", "B", "C", "X"],
    ["X", "X", "D", "X", "X"]
        ]

MOVES = {
    "U": lambda position: (position[0] - 1, position[1]) if (position[0] > 0 and value((position[0] - 1, position[1])) != "X" ) else position,
    "D": lambda position: (position[0] + 1, position[1]) if (position[0] < SIZE and value((position[0] + 1, position[1])) != "X") else position,
    "L": lambda position: (position[0], position[1] - 1) if (position[1] > 0 and value((position[0], position[1] - 1)) != "X") else position,
    "R": lambda position: (position[0], position[1] + 1) if (position[1] < SIZE and value((position[0], position[1] + 1)) != "X") else position,
    "\n": lambda position: position
}


def process_line(position, line):
    for move in line:
        position = MOVES[move](position)
    return position


def parse_file(filepath):
    code = ""
    position = (1, 1)
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            position = process_line(position, line)
            number = value(position)
            code += str(number)
    return code


def value(position):
    return GRID[position[0]][position[1]]


if __name__ == "__main__":
    print parse_file(sys.argv[1])
