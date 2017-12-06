import sys


def is_valid(passphrase):
    words = passphrase.split()
    unique = set(words)
    return len(words) == len(unique)


def count_valid(filepath):
    count = 0
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            if is_valid(line):
                count += 1
    return count

if __name__ == "__main__":
    print count_valid(sys.argv[1])
