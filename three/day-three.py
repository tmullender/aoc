#! env python
import sys
import re


def is_triangle(lengths):
    lengths = sorted(lengths)
    return lengths[0] + lengths[1] > lengths[2]


def find_impossible_triangles(filepath):
    count = 0
    lines = []
    with open(filepath, 'r') as reader:
        for line in reader:
            lengths = map(int, re.split(" +", line.strip('\n'))[1:])
            lines.append(lengths)
            if len(lines) == 3:
                if is_triangle(map(lambda x:x[0], lines)):
                    count += 1
                if is_triangle(map(lambda x:x[1], lines)):
                    count += 1
                if is_triangle(map(lambda x:x[2], lines)):
                    count += 1
                lines = []
    print "Count: " + str(count)

if __name__ == "__main__":
    find_impossible_triangles(sys.argv[1])