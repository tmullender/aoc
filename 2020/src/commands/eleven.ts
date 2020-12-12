import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function countOccupied(last: string[][], i: number, j: number) {
  const adjacent = [last[i][j - 1], last[i][j + 1]]
  if (i > 0) {
    adjacent.push(last[i - 1][j - 1], last[i - 1][j], last[i - 1][j + 1])
  }
  if (i < last.length - 1) {
    adjacent.push(last[i + 1][j - 1], last[i + 1][j], last[i + 1][j + 1])
  }
  return adjacent.filter(x => x === '#').length
}

export default class Eleven extends Command {
  static description = 'A solver for Day Eleven'

  static examples = [
    `$ aoc-2020 eleven resources/test-eleven-a.txt
37
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
          const occupied = countOccupied(last, i, j)
          if (current[i][j] === '#' && occupied >= 4) {
            current[i][j] = 'L'
          } else if (current[i][j] === 'L' && occupied === 0) {
            current[i][j] = '#'
          }
        }
      }
    } while (!current.every((x, i) => x.every((y, j) => y === last[i][j])))
    const count = current.map(x => x.filter(y => y === '#').length).reduce((acc, x) => acc + x)
    this.log(`${count}`)
  }
}
