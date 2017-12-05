import sys


def count_steps(target):
    size = 1
    while (size ** 2) <= target:
        size += 2
    x_offset = int(size/2)
    y_offset = ((size**2 - target) % (size-1)) - size/2
    return x_offset + abs(y_offset)


if __name__ == "__main__":
    print count_steps(int(sys.argv[1]))