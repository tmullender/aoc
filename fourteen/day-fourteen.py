#! /usr/bin/env python

from hashlib import md5
from re import compile

TRIPLET = compile("(?P<a>.)(?P=a)(?P=a)")

CACHE = {}


def calculate_stretched_hash(index):
    if index in CACHE:
        return CACHE[index]
    digest = calculate_hash("ihaygndm" + str(index))
    for i in range(0, 2016):
        digest = calculate_hash(digest)
    CACHE[index] = digest
    return digest


def calculate_hash(source):
    md5_hash = md5()
    md5_hash.update(source)
    digest = md5_hash.hexdigest()
    return digest


if __name__ == "__main__":
    keys = []
    increment = 0
    while len(keys) < 64:
        increment += 1
        key = calculate_stretched_hash(increment)
        search = TRIPLET.search(key)
        if search:
            for i in range(increment+1, increment+1001):
                next_key = calculate_stretched_hash(i)
                if search.group("a")*5 in next_key:
                    keys.append(key)
                    break
    print increment
