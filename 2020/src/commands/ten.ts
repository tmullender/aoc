import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Ten extends Command {
  static description = 'A solver for Day Ten'

  static examples = [
    `$ aoc-2020 ten resources/test-ten-a.txt
8
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Ten)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x).map(x => parseInt(x, 10))
    content.push(0)
    const adaptors = content.sort((a, b) => a - b)
    adaptors.push(adaptors[adaptors.length - 1] + 3)
    const paths = [[adaptors[0], 1]]
    for (let i = 0; i < adaptors.length; i++) {
      const next = adaptors.slice(i + 1, i + 4).filter(x => x <= adaptors[i] + 3)
      const length = paths.length
      let count = 0
      for (let j = 0; j < length; j++) {
        if (paths[j][0] === adaptors[i]) {
          paths[j][0] = next[0]
          count += paths[j][1]
        }
      }
      if (next.length > 1) {
        paths.push(...next.slice(1).map(x => [x, count]))
      }
      // console.log(paths)
    }
    this.log(`${paths.reduce((acc, x) => acc + x[1], 0)}`)
  }
}
