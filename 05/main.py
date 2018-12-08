#! /bin/env python


def react(input):
    i = 2
    while i < len(input):
        if input[i] != input[i - 1] and input[i].lower() == input[i - 1].lower():
            input = input[0:i - 1] + input[i + 1:]
            i -= 2
        i += 1
    return len(input) - 1


if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        line = "#" + reader.readline()
        shortest = len(line)
        for char in "abcdefghijklmnopqrstuvwxyz":
            updated = line.replace(char, "").replace(char.upper(), "")
            result = react(updated)
            if result < shortest:
                shortest = result
        print shortest
