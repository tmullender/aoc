#! /bin/env python

import sys

KEY = "abcedfeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


def closest(i, j, options):
    distance = 2000
    location = None
    for option in options:
        d = abs(i - option[0]) + abs(j-option[1])
        if d == distance:
            location = None
        elif d < distance:
            distance = d
            location = options.index(option)
    return (i, j), location


def collect(locations, l):
    key = l[1]
    if key in locations:
        locations[key].append(l[0])
    else:
        locations[key] = [l[0]]
    return locations


def finite(locations, i, low, high):
    return len(filter(lambda x: x[i] in (low, high), locations)) == 0


def print_grid(input):
    last = 0
    for x in input:
        if x[0][1] != last:
            sys.stdout.write('\n')
        if x[1] or x[1] == 0:
            sys.stdout.write(KEY[x[1]])
        else:
            sys.stdout.write('.')
        last = x[0][1]
    sys.stdout.write('\n')
    sys.stdout.flush()


if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        coords = []
        for line in reader.readlines():
            coords.append(tuple(map(int, line.split(","))))
        by_x = sorted(coords, lambda x, y: x[0] - y[0])
        by_y = sorted(coords, lambda x, y: x[1] - y[1])
        low_x = by_x[0][0]
        high_x = by_x[-1][0] + 1
        low_y = by_y[0][1]
        high_y = by_y[-1][1] + 1
        grid = [closest(x, y, coords) for y in (range(low_y, high_y)) for x in (range(low_x, high_x))]
        # print_grid(grid)
        r = reduce(collect, grid, dict())
        size = 0
        biggest = None
        for k in filter(lambda x: x and finite(r[x], 0, low_x, high_x-1) and finite(r[x], 1, low_y, high_y-1), r):
            if len(r[k]) > size:
                size = len(r[k])
                biggest = k
        print biggest, KEY[biggest], size, r[biggest]