import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Policy {
  min: number;

  max: number;

  letter: string;

  constructor(description: string) {
    const parts = description.split(/[^0-9a-z]/)
    this.min = parseInt(parts[0], 10)
    this.max = parseInt(parts[1], 10)
    this.letter = parts[2]
  }

  matches(password: string): boolean {
    let count = 0
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) === this.letter) {
        count++
      }
    }
    return count >= this.min && count <= this.max
  }
}

export default class Two extends Command {
  static description = 'A solver for Day Two'

  static examples = [
    `$ aoc-2020 two resources/test-two-a.txt
2
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Two)

    const content = readFileSync(args.input, {encoding: 'UTF8'})
    const count = content.split('\n').filter(x => x).map(x => new Policy(x).matches(x.split(':')[1])).reduce((acc, current) => current ? ++acc : acc, 0)
    this.log(`${count}`)
  }
}
