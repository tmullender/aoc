import sys
import re


PATTERN = re.compile("([a-z]+) \(([0-9]+)\)( -> (.*))?")


def correct_weight(weights, programs):
    if len(weights) == 1:
        return 0
    else:
        invalid, initial, correct = 0, 0, 0
        for k, v in weights.iteritems():
            if len(v) == 1:
                invalid = k
                initial = programs[v[0]][0]
            else:
                correct = k
        return initial + correct - invalid



def sum_weights(start, programs):
    details = programs[start]
    total = details[0]
    supported = details[1]
    corrected = 0
    if supported:
        weights = {}
        for program in supported:
            weight, offset = sum_weights(program, programs)
            if corrected == 0:
                corrected = offset
            total += weight
            if weight in weights:
                weights[weight].append(program)
            else:
                weights[weight] = [program]
        if corrected == 0:
            corrected = correct_weight(weights, programs)
    return total, corrected


def build_tower(file_path):
    programs = {}
    uppers = set()
    with open(file_path, 'r') as reader:
        for line in reader.readlines():
            details = PATTERN.search(line).groups()
            supporting = details[3]
            if supporting:
                uppers.update(supporting.split(", "))
                programs[details[0]] = (int(details[1]), supporting.split(", "))
            else:
                programs[details[0]] = (int(details[1]), supporting)
        start = None
        for program in programs:
            if program not in uppers:
                start = program
    return sum_weights(start, programs)


if __name__ == "__main__":
    print build_tower(sys.argv[1])
