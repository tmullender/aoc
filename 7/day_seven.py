import sys
import re


PATTERN = re.compile("([a-z]+) \(([0-9]+)\)( -> (.*))?")


def build_tower(file_path):
    programs = {}
    uppers = set()
    with open(file_path, 'r') as reader:
        for line in reader.readlines():
            details = PATTERN.search(line).groups()
            programs[details[0]] = details
            supporting = details[3]
            if supporting:
                uppers.update(supporting.split(", "))
        for program in programs:
            if program not in uppers:
                return program
    return None


if __name__ == "__main__":
    print build_tower(sys.argv[1])
