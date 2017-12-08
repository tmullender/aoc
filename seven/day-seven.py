#! /usr/bin/env python

import sys
import re

BAB_IN_HYPER_PATTERN = re.compile("\[[^\]]*(?P<b>[^\]])(?P<a>[^\]])(?P=b)[^\]]*\]")
BAB_PATTERN = re.compile("(?P<b>[^\]])(?P<a>[^\]])(?P=b)")
HYPER_NET_PATTERN = re.compile("\[[^\]]+\]")


def supports_tls(ip_address):
    hyper = BAB_IN_HYPER_PATTERN.search(ip_address)
    while hyper:
        bab = BAB_PATTERN.search(hyper.group(0))
        while bab:
            b = bab.group("b")
            a = bab.group("a")
            if a != b:
                aba = a + b + a
                if aba in re.sub(HYPER_NET_PATTERN, "#", ip_address):
                    return True
            bab = BAB_PATTERN.search(hyper.group(0), bab.pos + 1)
        hyper = BAB_IN_HYPER_PATTERN.search(ip_address, hyper.pos + 1)
    return False


def count_tls_interfaces(filepath):
    count = 0
    with open(filepath, 'r') as reader:
        for line in reader.readlines():
            if supports_tls(line):
                count += 1
            else:
                count += 0
    return count            


if __name__ == "__main__":
    print count_tls_interfaces(sys.argv[1])
