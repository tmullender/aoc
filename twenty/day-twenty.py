#! /usr/bin/env python

import sys


def convert(line):
    parts = line.split("-")
    return (int(parts[0]), int(parts[1]))


def parse_file(file_path):
    with open(file_path, 'r') as reader:
        ranges = map(convert, reader.readlines())
    ranges = sorted(ranges)
    allowed = 0
    next_max = ranges[0][1]
    while ranges:
        ranges = filter(lambda x: x[1] > next_max, ranges)
        overlapping = filter(lambda x: x[0] <= next_max + 1, ranges)
        if overlapping:
            next_max = sorted(overlapping, lambda x, y: cmp(x[1], y[1]))[-1][1]
        else:
            next_min = ranges[0][0] if ranges else 4294967296
            allowed += next_min - next_max - 1
            next_max = next_min + 1
    print allowed


if __name__ == "__main__":
    parse_file(sys.argv[1])