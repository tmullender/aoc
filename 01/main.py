#! /bin/env python

if __name__ == "__main__":
    freqs = set()
    freq = 0
    while True:
        with open("input.txt", 'r') as reader:
            for line in reader.readlines():
                freq += int(line)
                if freq in freqs:
                    print freq
                    exit(0)
                freqs.add(freq)
