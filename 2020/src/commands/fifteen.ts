import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Fifteen extends Command {
  static description = 'A solver for Day Fifteen'

  static examples = [
    `$ aoc-2020 fifteen resources/test-fifteen-a.txt
4
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Fifteen)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split(',').map(x => parseInt(x, 10))
    while (content.length < 2020) {
      const last = content[content.length - 1]
      const index = content.lastIndexOf(last, content.length - 2)
      if (index < 0) {
        content.push(0)
      } else {
        content.push(content.length - index - 1)
      }
    }
    this.log(`${content[content.length - 1]}`)
  }
}
