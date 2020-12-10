import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Ten extends Command {
  static description = 'A solver for Day Ten'

  static examples = [
    `$ aoc-2020 ten resources/test-ten-a.txt
35
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Ten)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x).map(x => parseInt(x, 10))
    const adaptors = content.sort((a, b) => a - b)
    const differences = [0, 0, 0, 0]
    let last = 0
    for (let i = 0; i < adaptors.length; i++) {
      const difference = adaptors[i] - last
      differences[difference] += 1
      last = adaptors[i]
    }
    differences[3] += 1
    this.log(`${differences[1] * differences[3]}`)
  }
}
