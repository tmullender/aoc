#! /usr/bin/env python

import sys
import re

PATTERN = re.compile("\((\d+)x(\d+)\)")


def count_decompressed(line):
    match = PATTERN.search(line)
    if match:
        end = 0
        count = 0
        while match:
            count += match.start(0) - end
            end = match.end(0) + int(match.group(1))
            count += int(match.group(2)) * count_decompressed(line[match.end(0):end])
            match = PATTERN.search(line, end)
        count += len(line[end:])
        return count
    else:
        return len(line)


def parse_file(filepath):
    content = ""
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            content += line
    return count_decompressed(line)

if __name__ == "__main__":
    print count_decompressed("(3x3)XYZ") #9
    print count_decompressed("X(8x2)(3x3)ABCY") #20
    print count_decompressed("(27x12)(20x12)(13x14)(7x10)(1x12)A") #241920
    print count_decompressed("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN") #445
    print parse_file(sys.argv[1]) - 1
