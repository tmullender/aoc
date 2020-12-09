import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Nine extends Command {
  static description = 'A solver for Day Nine'

  static examples = [
    `$ aoc-2020 nine resources/test-nine-a.txt
62
`,
  ]

  static flags = {
    total: flags.integer({char: 't', default: 127}),
  }

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Nine)
    const {flags} = this.parse(Nine)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x).map(x => parseInt(x, 10))
    let i = 0
    let j = 0
    let total = content[0]
    while (i < content.length && j < content.length) {
      if (total < flags.total) {
        j++
        total += content[j]
      }
      if (total > flags.total) {
        total -= content[i]
        i++
      }
      if (total === flags.total) {
        const range = content.slice(i, j + 1)
        const weakness = Math.max(...range) + Math.min(...range)
        this.log(`${weakness}`)
        break
      }
    }
  }
}
