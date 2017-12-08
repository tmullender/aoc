#! /usr/bin/env python

from hashlib import md5

OPEN = ['b', 'c', 'd', 'e', 'f']
MAX = 3


def calculate_hash(source):
    md5_hash = md5()
    md5_hash.update(source)
    digest = md5_hash.hexdigest()
    return digest


def open_paths(path):
    result = calculate_hash("hhhxzeay" + path[0])
    paths = []
    if path[2] > 0 and result[0] in OPEN:
        paths.append((path[0] + 'U', path[1], path[2] - 1))
    if path[2] < MAX and result[1] in OPEN:
        paths.append((path[0] + 'D', path[1], path[2] + 1))
    if path[1] > 0 and result[2] in OPEN:
        paths.append((path[0] + 'L', path[1] - 1, path[2]))
    if path[1] < MAX and result[3] in OPEN:
        paths.append((path[0] + 'R', path[1] + 1, path[2]))
    return paths


if __name__ == "__main__":
    available = open_paths(("", 0, 0))
    paths = []
    while available:
        next_moves = []
        for i in available:
            if i[1] == MAX and i[2] == MAX:
                paths.append(i)
            else:
                next_moves += open_paths(i)
        available = next_moves
    print sorted(map(lambda x:len(x[0]), paths))[-1]
