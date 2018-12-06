#! /bin/env python
import re

CLAIM_PATTERN = re.compile("#(\d+) @ (\d+),(\d+): (\d+)x(\d+)")


class Claim:
    def __init__(self, text):
        m = re.match(CLAIM_PATTERN, text)
        self.id = m.group(1)
        self.x0 = int(m.group(2))
        self.y0 = int(m.group(3))
        self.length = int(m.group(4))
        self.height = int(m.group(5))
        self.x1 = self.x0 + self.length
        self.y1 = self.y0 + self.height

    def get_keys(self):
        return ["{}:{}".format(x, y) for y in range(self.y0, self.y1) for x in range(self.x0, self.x1)]

    def size(self):
        return self.height * self.length


if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        used = set()
        duplicated = set()
        for line in reader.readlines():
            claim = Claim(line)
            keys = claim.get_keys()
            for key in keys:
                if key in used:
                    duplicated.add(key)
                else:
                    used.add(key)
        print len(duplicated)




