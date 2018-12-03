#! /bin/env python

if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        total = 0
        for line in reader.readlines():
            total += int(line)
        print total
