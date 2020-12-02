import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Policy {
  first: number;

  second: number;

  letter: string;

  constructor(description: string) {
    const parts = description.split(/[^0-9a-z]/)
    this.first = parseInt(parts[0], 10) - 1
    this.second = parseInt(parts[1], 10) - 1
    this.letter = parts[2]
  }

  matches(password: string): boolean {
    return password.charAt(this.first) === this.letter ? password.charAt(this.second) !== this.letter : password.charAt(this.second) === this.letter
  }
}

export default class Two extends Command {
  static description = 'A solver for Day Two'

  static examples = [
    `$ aoc-2020 two resources/test-two-a.txt
1
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Two)

    const content = readFileSync(args.input, {encoding: 'UTF8'})
    const count = content.split('\n').filter(x => x).map(x => new Policy(x).matches(x.split(':')[1].trim())).reduce((acc, current) => current ? ++acc : acc, 0)
    this.log(`${count}`)
  }
}
