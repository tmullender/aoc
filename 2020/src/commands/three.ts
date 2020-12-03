import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function parseLine(line: string): boolean[] {
  return [...line].map(x => x === '#')
}

export default class Three extends Command {
  static description = 'A solver for Day Three'

  static examples = [
    `$ aoc-2020 three resources/test-three-a.txt
7
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Three)

    const content = readFileSync(args.input, {encoding: 'UTF8'})
    const map = content.split('\n').filter(x => x).map(parseLine)
    let count = 0
    let x = 0
    for (let y = 0; y < map.length; y++) {
      if (map[y][x]) {
        count++
      }
      x = (x + 3) % map[y].length
    }
    this.log(`${count}`)
  }
}
