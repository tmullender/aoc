#! /bin/env python

def in_range(i, j, options):
    distance = 0
    for option in options:
        d = abs(i - option[0]) + abs(j-option[1])
        distance += d
    return distance < 10000


def collect(total, included):
    return total + 1 if included else total


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
        grid = [in_range(x, y, coords) for y in (range(low_y, high_y)) for x in (range(low_x, high_x))]
        print reduce(collect, grid, 0)
