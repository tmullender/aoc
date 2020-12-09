import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs'
import {combination} from 'js-combinatorics'

export default class Nine extends Command {
  static description = 'A solver for Day Nine'

  static examples = [
    `$ aoc-2020 nine resources/test-nine-a.txt
127
`,
  ]

  static flags = {
    size: flags.integer({char: 's', default: 5}),
  }

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Nine)
    const {flags} = this.parse(Nine)
    const preamble = flags.size

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x).map(x => parseInt(x, 10))
    for (let i = preamble; i < content.length; i++) {
      const valid = combination(content.slice(i - preamble, i), 2).map(x => x[0] + x[1])
      if (!new Set(valid).has(content[i])) {
        this.log(`${content[i]}`)
        break
      }
    }
  }
}
