import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class One extends Command {
  static description = 'A solver for Day One'

  static examples = [
    `$ aoc-2020 one resources/test-one-a.txt
515479
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(One)
    const target = 2020
    const midPoint = 1010

    if (args.input) {
      const content = readFileSync(args.input, {encoding: 'UTF8'})
      const input = content.split('\n').filter(x => x).map(x => parseInt(x, 10)).sort((a, b) => a - b)
      for (let i = 0; i < input.length && input[i] <= midPoint; i++) {
        for (let j = input.length - 1; input[j] >= midPoint && j > 0; j--) {
          if (input[j] + input[i] === target) {
            this.log(`${input[i] * input[j]}`)
            return
          }
        }
      }
      this.log(`you input: ${input}`)
    }
  }
}
