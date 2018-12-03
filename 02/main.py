#! /bin/env python

def count_letters(line):
    a = 0
    b = 0
    counts = dict()
    for x in line:
        if x in counts:
            counts[x] += 1
        else:
            counts[x] = 1
    for count in counts.values():
        if count == 2:
            a = 1
        elif count == 3:
            b = 1
    return a, b

if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        twos = 0
        threes = 0
        for line in reader.readlines():
            a, b = count_letters(line)
            twos += a
            threes += b
        print twos * threes
        