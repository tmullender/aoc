import sys


def find_position(target):
    size = 1
    position = (0, 0)
    history = {position: 1}
    value = 0
    while value < target:
        size += 2
        while position[1] < size/2:
            position = (position[0], position[1]+1)
            value = calculate_value(history, position)
            if value > target:
                return value
        while position[0] > -size/2 + 1:
            position = (position[0]-1, position[1])
            value = calculate_value(history, position)
            if value > target:
                return value
        while position[1] > -size/2 + 1:
            position = (position[0], position[1]-1)
            value = calculate_value(history, position)
            if value > target:
                return value
        while position[0] < size/2:
            position = (position[0]+1, position[1])
            value = calculate_value(history, position)
            if value > target:
                return value
    return value


def calculate_value(history, position):
    total = sum([v for k, v in history.iteritems() if abs(k[0] - position[0]) < 2 and abs(k[1] - position[1]) < 2])
    history[position] = total
    return total


if __name__ == "__main__":
    print find_position(int(sys.argv[1]))
