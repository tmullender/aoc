import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function findSeat(last: string[][], i: number, j: number, offset: [number, number]) {
  while (i >= 0 && i < last.length && j >= 0 && j < last[i].length) {
    if (last[i][j] === 'L') {
      return 0
    }
    if (last[i][j] === '#') {
      return 1
    }
    i += offset[0]
    j += offset[1]
  }
  return 0
}

function countOccupied(last: string[][], i: number, j: number) {
  return findSeat(last, i - 1, j - 1, [-1, -1]) +
    findSeat(last, i - 1, j, [-1, 0]) +
    findSeat(last, i - 1, j + 1, [-1, 1]) +
    findSeat(last, i, j - 1, [0, -1]) +
    findSeat(last, i, j + 1, [0, 1]) +
    findSeat(last, i + 1, j - 1, [1, -1]) +
    findSeat(last, i + 1, j, [1, 0]) +
    findSeat(last, i + 1, j + 1, [1, 1])
}

function updateSeat(current: string[][], i: number, j: number, occupied: number) {
  if (current[i][j] === '#' && occupied >= 5) {
    current[i][j] = 'L'
  } else if (current[i][j] === 'L' && occupied === 0) {
    current[i][j] = '#'
  }
}

export default class Eleven extends Command {
  static description = 'A solver for Day Eleven'

  static examples = [
    `$ aoc-2020 eleven resources/test-eleven-a.txt
26
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Eleven)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const current = content.map(x => [...x])
    let last = [['#']]
    do {
      last = current.map(x => [...x])
      for (let i = 0; i < current.length; i++) {
        for (let j = 0; j < current[i].length; j++) {
          if (last[i][j] !== '.') {
            const occupied = countOccupied(last, i, j)
            updateSeat(current, i, j, occupied)
          }
        }
      }
    } while (!current.every((x, i) => x.every((y, j) => y === last[i][j])))
    const count = current.map(x => x.filter(y => y === '#').length).reduce((acc, x) => acc + x)
    this.log(`${count}`)
  }
}
