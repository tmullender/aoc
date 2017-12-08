#! /usr/bin/env python


def a(i):
    return float(19 * i - 3)/17


def b(i):
    return float(19 * i - 3)/7


def d(i):
    return float(19 * i - 1)/5


def e(i):
    return float(19 * i)/3


def f(i):
    return float(19 * i + 6)/13


def g(i):
    return float(19 * i + 2)/11


def is_int(x):
    return x - int(x) == 0


if __name__ == "__main__":
    c = 1
    while not (is_int(a(c)) and is_int(b(c)) and is_int(d(c)) and is_int(e(c)) and is_int(f(c)) and is_int(g(c))):
        c += 1
    print 19 * c - 5