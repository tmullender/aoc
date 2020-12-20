import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Fifteen extends Command {
  static description = 'A solver for Day Fifteen'

  static examples = [
    `$ aoc-2020 fifteen resources/test-fifteen-a.txt
4
`,
  ]

  static flags = {
    index: flags.integer({char: 'i', default: 2020}),
  }

  static args = [{name: 'input', required: true}]

  async run() {
    const {args, flags} = this.parse(Fifteen)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split(',').reduce((acc, x, i) => acc.set(parseInt(x, 10), i), new Map())
    let index = content.size // Assumes initial values are unique
    let value = 0
    while (index < flags.index - 1) {
      const last = content.get(value)
      content.set(value, index)
      if (last === undefined) {
        value = 0
      } else {
        value = index - last
      }
      index++
    }
    this.log(`${value}`)
  }
}
