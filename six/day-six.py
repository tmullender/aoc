#! /usr/bin/env python

import sys
import itertools


def decode_message(filepath):
    message = ""
    letters = parse_file(filepath)
    for letter in letters:
        actual = find_letter(letter)
        message += actual
    return message


def find_letter(letters):
    actual = ''
    min_count = len(letters)
    for k, v in itertools.groupby(sorted(letters)):
        count = len(list(v))
        if count < min_count:
            actual = k
            min_count = count
    return actual


def parse_file(filepath):
    letters = []
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            for i in range(0, len(line)):
                if i not in letters:
                    letters.append([])
                letters[i].append(line[i])
    return letters


if __name__ == "__main__":
    print decode_message(sys.argv[1])
