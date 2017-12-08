#! /usr/bin/env python

from itertools import combinations, product


class Floor:
    def __init__(self, generators, microchips):
        self.generators = set(generators)
        self.microchips = set(microchips)

    def count(self):
        return len(self.generators) + len(self.microchips)

    def moves(self):
        return map(lambda x: (set(x), set()), combinations(self.generators, 2)) \
               + map(lambda x: (set(), set(x)), combinations(self.microchips, 2)) \
               + map(lambda x: (set([x]), set([x])), self.generators & self.microchips) \
               + map(lambda x: (set([x]), set()), self.generators) \
               + map(lambda x: (set(), set([x])), self.microchips)

    def is_unsafe(self):
        unsafe = self.microchips - self.generators
        return len(unsafe) > 0 and len(self.generators) > 0

    def is_full(self):
        return len(self.generators) == COUNT == len(self.microchips)

    def remove(self, moved):
        return Floor(self.generators - moved[0], self.microchips - moved[1])

    def add(self, moved):
        return Floor(self.generators | moved[0], self.microchips | moved[1])

    def __repr__(self):
        return str(self.generators) + " " + str(self.microchips)

    def __eq__(self, other):
        return self.microchips == other.microchips and self.generators == other.generators

    def __hash__(self):
        return sum(map(lambda x, y: hash(x) + hash(y), self.generators, self.microchips))


class Board:
    def __init__(self, lift, floors):
        self.lift = lift
        self.floors = floors
        self.size = len(floors)

    def current_floor(self):
        return self.lift

    def is_valid(self):
        return all(map(lambda x: not x.is_unsafe(), self.floors))

    def is_complete(self):
        return self.floors[-1].is_full() and self.top_floor() == self.current_floor()

    def top_floor(self):
        return self.size - 1

    def moves(self):
        return self.floors[self.lift].moves()

    def count(self):
        return sum(map(lambda x: x.count(), self.floors))

    def move(self, moved, origin, destination):
        # print "Move", moved, origin, destination
        updated = list(self.floors)
        updated[origin] = updated[origin].remove(moved)
        updated[destination] = updated[destination].add(moved)
        return Board(destination, updated)

    def __hash__(self):
        return sum(map(lambda x: hash(x), self.floors)) + self.lift

    def __eq__(self, other):
        return self.floors == other.floors and self.lift == other.lift

    def __repr__(self):
        return "At Floor {0}: {1}".format(self.lift, self.floors)


BOARD = Board(0, [
          Floor(["pro"], ["pro"]),
          Floor(["cob", "cur", "rut", "plu"], []),
          Floor([], ["cob", "cur", "rut", "plu"]),
          Floor([], [])
])
COUNT = 5
# BOARD = Board(0, [
#           Floor([],["hyd", "lit"]),
#           Floor(["hyd"], []),
#           Floor(["lit"], []),
#           Floor([], [])
# ])
# COUNT = 2
VISITED = set()


def move(board, moved, origin, destination):
    next_board = board.move(moved, origin, destination)
    if next_board not in VISITED:
        VISITED.add(next_board)
        if next_board.is_valid():
            # print "Next", next_board
            return [next_board]
        # else:
            # print "Invalid", next_board
    # else:
    #     print "Tried", next_board
    return []


def possible_moves(board):
    '''I have to move one or two compatible items from the current floor to the floor above or below'''
    possible = []
    current = board.current_floor()
    for mover in board.moves():
        if current < board.top_floor():
            possible += move(board, mover, current, current +1 )
        if current > 0:
            possible += move(board, mover, current, current - 1)
    return possible


if __name__ == "__main__":
    VISITED.add(BOARD)
    moves = possible_moves(BOARD)
    count = 0
    done = False
    while not done and moves != []:
        count += 1
        next_moves = []
        for option in moves:
            print count, len(VISITED), option
            if option.is_complete():
                print "Final", count
                done = True
                break
            next_moves += possible_moves(option)
        moves = next_moves
    print count
