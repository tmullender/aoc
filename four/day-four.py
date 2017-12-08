#! env python
from sys import argv
from re import match
from itertools import groupby

A2Z = "abcdefghijklmnopqrstuvwxyz"


def parse_file(filepath):
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            groups = match('([a-z-]+)-([0-9]+)\[([a-z]+)\]', line)
            room = groups.group(1)
            sector_id = int(groups.group(2))
            counts = count_letters(room)
            ordered = sorted(counts, key=lambda x: -x[1])
            checksum = ''.join(map(lambda x: x[0], ordered[0:5]))
            if checksum == groups.group(3):
                name = translate_room(room, sector_id)
                print name, sector_id


def translate_room(room, sector_id):
    name = map(lambda x: x if x == "-" else A2Z[(A2Z.index(x) + sector_id) % 26], room)
    return ''.join(name)


def count_letters(room):
    counts = []
    for k, v in groupby(sorted(room.replace('-', ''))):
        counts.append((k, len(list(v))))
    return counts


if __name__ == "__main__":
    print parse_file(argv[1])
