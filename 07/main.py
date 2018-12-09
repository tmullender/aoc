#! /bin/env python


def remove_deps(dependencies, used, possible):
    no_dependencies = []
    for x in possible:
        if x in path:
            continue
        if x not in dependencies:
            no_dependencies.append(x)
        else:
            undone = False
            for d in dependencies[x]:
                if d not in used:
                    undone = True
            if not undone:
                no_dependencies.append(x)
    return no_dependencies


if __name__ == "__main__":
    makes_available = dict()
    depends_on = dict()
    path = ""
    with open("input.txt", 'r') as reader:
        for line in reader.readlines():
            parts = line.split()
            step = parts[1]
            child = parts[7]
            if step in makes_available:
                makes_available[step].append(child)
            else:
                makes_available[step] = [child]
            if child in depends_on:
                depends_on[child].append(step)
            else:
                depends_on[child] = [step]
        options = sorted(set(makes_available.keys()).difference(depends_on.keys()))
        while len(options) > 0:
            step = options[0]
            path += step
            available = makes_available[step] if step in makes_available else []
            available = remove_deps(depends_on, path, available)
            options = sorted(set(options[1:] + available))
        print path

