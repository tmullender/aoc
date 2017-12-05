import sys


def checksum(file_path):
    total = 0
    with open(file_path, 'r') as reader:
        for line in reader.readlines():
            fields = map(int, line.split())
            highest = max(fields)
            lowest = min(fields)
            difference = highest - lowest
            total += difference
    return total


if __name__ == "__main__":
    print checksum(sys.argv[1])