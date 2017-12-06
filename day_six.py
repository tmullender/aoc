import sys


def redistribute(filepath):
    with open(filepath, 'r') as reader:
        banks = map(int, reader.readline().split())
        history = {create_key(banks)}
        cycle = 0
        last_seen = 0
        while True:
            bank = min([bank for bank, value in enumerate(banks) if value == max(banks)])
            value = banks[bank]
            cycle += 1
            banks[bank] = 0
            distribute(bank, banks, value)
            key = create_key(banks)
            if key in history and last_seen > 0:
                return cycle - last_seen
            elif key in history:
                last_seen = cycle
                history = {key}
            history.add(key)
    return 0


def create_key(banks):
    return ",".join(map(str, banks))


def distribute(bank, banks, value):
    while value > 0:
        bank = (bank + 1) % len(banks)
        banks[bank] += 1
        value -= 1


if __name__ == "__main__":
    print redistribute(sys.argv[1])
