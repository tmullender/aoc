import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function parseLine(line: string): boolean[] {
  return [...line].map(x => x === '#')
}

function countTrees(map: boolean[][], right: number, down: number): number {
  let count = 0
  let x = 0
  for (let y = 0; y < map.length; y += down) {
    if (map[y][x]) {
      count++
    }
    x = (x + right) % map[y].length
  }
  return count
}

export default class Three extends Command {
  static description = 'A solver for Day Three'

  static examples = [
    `$ aoc-2020 three resources/test-three-a.txt
336
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Three)

    const content = readFileSync(args.input, {encoding: 'UTF8'})
    const map = content.split('\n').filter(x => x).map(parseLine)
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    const total = slopes.reduce((acc, current) => acc * countTrees(map, current[0], current[1]), 1)
    this.log(`${total}`)
  }
}
