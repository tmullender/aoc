import sys


def checksum(file_path):
    total = 0
    with open(file_path, 'r') as reader:
        for line in reader.readlines():
            fields = map(int, line.split())
            matches = [x/y for x in fields for y in fields if x != y and x % y == 0]
            total += sum(matches)
    return total


if __name__ == "__main__":
    print checksum(sys.argv[1])