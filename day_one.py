import sys


def sum_repeated_digits(captcha):
    length = len(captcha)
    increment = 1
    total = 0
    for i, c in enumerate(captcha):
        idx = (i + increment) % length
        if c == captcha[idx]:
            total += int(c)
    return total


if __name__ == "__main__":
    print sum_repeated_digits(sys.argv[1])