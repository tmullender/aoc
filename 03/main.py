#! /bin/env python
import re

CLAIM_PATTERN = re.compile("#(\d+) @ (\d+),(\d+): (\d+)x(\d+)")

class Claim:
    def __init__(self, line):
        m = re.match(CLAIM_PATTERN, line)
        self.id = m.group(1)
        self.x0 = m.group(2)
        self.y0 = m.group(3)
        self.x1 = m.group(4)
        self.y1 = m.group(5)

if __name__ == "__main__":
    with open("test.txt", 'r') as reader:
        for line in reader.readlines():
            claim = Claim(line)



