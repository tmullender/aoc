import sys


def count_instructions(filepath):
    with open(filepath, 'r') as reader:
        instructions = map(int, reader.readlines())
        position = 0
        steps = 0
        while 0 <= position < len(instructions):
            instruction = instructions[position]
            instructions[position] = instruction + 1
            position += int(instruction)
            steps +=1
        return steps


if __name__ == "__main__":
    print count_instructions(sys.argv[1])