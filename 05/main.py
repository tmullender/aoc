#! /bin/env python

if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        line = reader.readline()
        i = 1
        while i < len(line):
            if line[i] != line[i-1] and line[i].lower() == line[i-1].lower():
                line = line[0:i-1] + line[i+1:]
                i -= 2
            i += 1
        print len(line)
        print line