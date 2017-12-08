#! /usr/bin/env python


def expand_data(a):
    b = reversed(a)
    b = map(lambda x: "0" if x == "1" else "1", b)
    return a + "0" + "".join(b)


def checksum(data):
    if len(data) % 2 != 0:
        return data
    else:
        check = reduce_checksum(data)
        return checksum(check)


def reduce_checksum(data):
    check = ""
    for i in range(0, len(data), 2):
        chunk = data[i:i + 2]
        if chunk == "11" or chunk == "00":
            check += "1"
        else:
            check += "0"
    return check


if __name__ == "__main__":
    length = 35651584
    my_input = "10001110011110000"
    while len(my_input) < length:
        my_input = expand_data(my_input)
    print checksum(my_input[0:length])
