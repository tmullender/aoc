#! /usr/bin/env python

VISITED = set()
OFFSET = 1364


def is_open(x, y):
    if (x,y) in VISITED:
        return False
    decimal = x * x + 3 * x + 2 * x * y + y + y * y + OFFSET
    binary = bin(decimal)
    total = sum(map(int, binary[2:]))
    return total % 2 == 0


def list_moves(x, y):
    moves = []
    if is_open(x, y + 1):
        moves.append((x, y + 1))
    if is_open(x + 1, y):
        moves.append((x + 1, y))
    if y > 0 and is_open(x, y - 1):
        moves.append((x, y - 1))
    if x > 0 and is_open(x - 1, y):
        moves.append((x - 1, y))
    for move in moves:
        VISITED.add(move)
    return moves

if __name__ == "__main__":
    x = 1
    y = 1
    available = list_moves(x, y)
    count = 0
    while available and count < 50:
        next_moves = []
        count += 1
        print count, len(VISITED)
        for x, y in available:
            print x, y
            next_moves += list_moves(x, y)
        available = next_moves
    print len(VISITED)