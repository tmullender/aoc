#! /usr/bin/env python

from sys import argv
import re

GIVE_TO___ = re.compile("(.*) gives low to (.*) and high to (.*)")
VALUE__GOES_TO__ = re.compile("value (\d+) goes to (.*)")


class Bot:
    def __init__(self, name):
        self.name = name
        self.lowValue = -1
        self.highValue = -1
        self.lowBot = None
        self.highBot = None

    def __repr__(self):
        return "{0} {1}:{2}".format(self.name, self.lowValue, self.highValue)

    def given(self, value):
        if value > self.highValue:
            self.lowValue = self.highValue
            self.highValue = value
        else:
            self.lowValue = value
        self._cascade()

    def passes(self, low, high):
        self.lowBot = low
        self.highBot = high
        self._cascade()

    def _cascade(self):
        if self.lowValue == 17 and self.highValue == 61:
            print "***********", self.name
        if self.lowValue >= 0 and self.highValue >=0 and self.lowBot:
            self.lowBot.given(self.lowValue)
            self.highBot.given(self.highValue)


BOTS = {}


def get_bot(name):
    if name not in BOTS:
        BOTS[name] = Bot(name)
    return BOTS[name]


def parse_file(file_path):
    with open(file_path, 'r') as reader:
        for line in reader.readlines():
            match = GIVE_TO___.match(line)
            if match:
                get_bot(match.group(1)).passes(get_bot(match.group(2)), get_bot(match.group(3)))
            else:
                match = VALUE__GOES_TO__.match(line)
                get_bot(match.group(2)).given(int(match.group(1)))


if __name__ == "__main__":
    parse_file(argv[1])
    print BOTS["output 0"]
    print BOTS["output 1"]
    print BOTS["output 2"]