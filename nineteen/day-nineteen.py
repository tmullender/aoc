#! /usr/bin/env python

ELVES = 3004953

if __name__ == "__main__":
    count = ELVES
    factor = 1
    while factor * 3 < count:
        factor *= 3
    if count < 2 * factor:
        print count - factor
    else:
        print 2 * count - 3 * factor
