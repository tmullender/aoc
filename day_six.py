import sys


def redistribute(filepath):
    with open(filepath, 'r') as reader:
        banks = map(int, reader.readline().split())
        history = {",".join(map(str, banks))}
        cycle = 0
        while True:
            highest = max(banks)
            bank = min([bank for bank, value in enumerate(banks) if value == highest])
            value = banks[bank]
            cycle += 1
            banks[bank] = 0
            while value > 0:
                bank = (bank + 1) % len(banks)
                banks[bank] += 1
                value -= 1
            key = ",".join(map(str, banks))
            if key in history:
                return cycle
            history.add(key)
    return 0


if __name__ == "__main__":
    print redistribute(sys.argv[1])