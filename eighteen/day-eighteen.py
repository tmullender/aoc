#! /usr/bin/env python

INPUT = "^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^."
LINES = 400000

TRAP = ["^^.", ".^^", "^..", "..^"]

if __name__ == "__main__":
    effective = '.' + INPUT + '.'
    count = len(INPUT.replace("^", ""))
    for x in range(0, LINES-1):
        line = "."
        for i in range(1, len(effective) - 1):
            previous = effective[i-1:i+2]
            if previous in TRAP:
                line += '^'
            else:
                count += 1
                line += '.'
        effective = line + '.'
    print count
