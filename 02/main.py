#! /bin/env python

if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        lines = reader.readlines()
        for line in range (0, len(lines)):
            for next in range(line+1, len(lines)):
                differences = 0
                currentLine = lines[line]
                nextLine = lines[next]
                if len(currentLine) == len(nextLine):
                    for i in range(0, len(currentLine)):
                        if currentLine[i] != nextLine[i]:
                            differences +=1
                        if differences > 1:
                            break
                    if differences == 1:
                        print currentLine
                        print nextLine
                        exit(0)
