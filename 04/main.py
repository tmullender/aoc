#! /bin/env python
import datetime
import re

UPDATE_PATTERN = re.compile("\[(.+)\] \w+ ([#0-9a-z]+).*")


class Guard:
    def __init__(self, guardId):
        self.guardId = guardId
        self.start_time = None
        self.duration = 0
        self.minutes = dict()

    def start(self, time):
        self.start_time = time

    def end(self, time):
        asleep = range(self.start_time.minute, time.minute)
        self.duration += len(asleep)
        for minute in asleep:
            if minute in self.minutes:
                self.minutes[minute] += 1
            else:
                self.minutes[minute] = 1

    def total(self):
        return self.duration

    def busiest(self):
        count = 0
        minute = None
        for k in self.minutes:
            if self.minutes[k] > count:
                minute = k
                count = self.minutes[k]
        return minute


if __name__ == "__main__":
    with open("input.txt", 'r') as reader:
        guards = dict()
        current = None
        sleepiest = None
        for line in reader.readlines():
            match = UPDATE_PATTERN.match(line)
            update = datetime.datetime.strptime(match.group(1), "%Y-%m-%d %H:%M")
            updateType = match.group(2)
            if updateType == "asleep":
                current.start(update)
            elif updateType == "up":
                current.end(update)
            elif updateType in guards:
                current = guards[updateType]
            else:
                current = Guard(updateType)
                guards[updateType] = current
            if sleepiest is None or current.total() > sleepiest.total():
                sleepiest = current
        print sleepiest.guardId, sleepiest.busiest()