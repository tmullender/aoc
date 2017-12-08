#! env python

import sys

VISITED = set()

FACING = ['N', 'E', 'S', 'W']

OPTIONS = {
    "R": lambda position:FACING[(FACING.index(position[2]) + 1) % 4],
    "L": lambda position:FACING[(FACING.index(position[2]) - 1) % 4]
         }

MOVES = {
    "N": lambda position, amount: [(position[0] + x, position[1], "N") for x in range(1, amount + 1)],
    "E": lambda position, amount: [(position[0], position[1] + x, "E") for x in range(1, amount + 1)],
    "S": lambda position, amount: [(position[0] - x, position[1], "S") for x in range(1, amount + 1)],
    "W": lambda position, amount: [(position[0], position[1] - x, "W") for x in range(1, amount + 1)]
    }


def parse_file(file):
  with open(file, 'r') as input:
    line = input.readline()
    return line.split(", ")


def move(position, instruction):
    direction = instruction[0];
    amount = int(instruction[1:])
    next_direction = OPTIONS[direction](position)
    return MOVES[next_direction](position, amount)


def follow_path(file):
    instructions = parse_file(file)
    position=(0,0,'N')
    for instruction in instructions:
        print instruction
        positions = move(position, instruction)
        for position in positions:
            print position
            point = (position[0], position[1])
            if point in VISITED:
                print point
            else:
                VISITED.add(point)


if __name__ == "__main__":
    follow_path(sys.argv[1])
