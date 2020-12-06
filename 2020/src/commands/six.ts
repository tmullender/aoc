import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Six extends Command {
  static description = 'A solver for Day Six'

  static examples = [
    `$ aoc-2020 six resources/test-six-a.txt
6
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Six)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    let count = 0
    let currentSet = new Set([...content[0]])
    for (let i = 0; i < content.length; i++) {
      const line = content[i]
      if (line) {
        currentSet = new Set([...line].filter(x => currentSet.has(x)))
      } else {
        count += currentSet.size
        if (i < content.length - 1) {
          currentSet = new Set([...content[i + 1]])
        }
      }
    }
    this.log(`${count}`)
  }
}
