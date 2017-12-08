#! env python

from hashlib import md5


def find_password(door_id):
    password = ["_" for x in range(0,8)]
    index = 0
    while "_" in password:
        result = compute_hash(door_id, index)
        while not result.startswith("00000"):
            index += 1
            result = compute_hash(door_id, index)
        print index, result
        position = int(result[5], 16)
        if position < len(password) and password[position] == "_":
            password[position] = result[6]
        index += 1
    return "".join(password)


def compute_hash(door_id, index):
    md5_hash = md5()
    source = door_id + str(index)
    md5_hash.update(source)
    return md5_hash.hexdigest()


if __name__ == "__main__":
    print find_password("abbhdwsy")
