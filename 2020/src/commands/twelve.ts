import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Instruction {
  type: string;

  value: number;

  constructor(input: string) {
    this.type = input[0]
    this.value = parseInt(input.substring(1), 10)
  }

  apply(position: number[]) {
    switch (this.type) {
    case 'N':
      position[1] += this.value
      break
    case 'E':
      position[2] += this.value
      break
    case 'S':
      position[1] -= this.value
      break
    case 'W':
      position[2] -= this.value
      break
    case 'R':
      position[0] = (position[0] + this.value) % 360
      break
    case 'L':
      position[0] = (position[0] - this.value + 360) % 360
      break
    case 'F':
      switch (position[0]) {
      case 0:
        position[1] += this.value
        break
      case 90:
        position[2] += this.value
        break
      case 180:
        position[1] -= this.value
        break
      case 270:
        position[2] -= this.value
        break
      }
    }
  }
}

export default class Twelve extends Command {
  static description = 'A solver for Day Twelve'

  static examples = [
    `$ aoc-2020 twelve resources/test-twelve-a.txt
25
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Twelve)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const position = [90, 0, 0]
    content.map(x => new Instruction(x).apply(position))
    const distance = Math.abs(position[1]) + Math.abs(position[2])
    this.log(`${distance}`)
  }
}
