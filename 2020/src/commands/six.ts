import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Six extends Command {
  static description = 'A solver for Day Six'

  static examples = [
    `$ aoc-2020 six resources/test-six-a.txt
11
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Six)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    let count = 0
    const currentSet = new Set()
    content.forEach(line => {
      if (line) {
        [...line].forEach(currentSet.add, currentSet)
      } else {
        count += currentSet.size
        currentSet.clear()
      }
    })
    this.log(`${count}`)
  }
}
