import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Instruction {
  type: string;

  value: number;

  constructor(input: string) {
    this.type = input[0]
    this.value = parseInt(input.substring(1), 10)
  }

  rotate(waypoint: number[], angle: number) {
    for (let i = 0; i < ((angle + 360) % 360) / 90; i++) {
      const initial = waypoint[0]
      waypoint[0] = -waypoint[1]
      waypoint[1] = initial
    }
  }

  apply(position: number[], waypoint: number[]) {
    switch (this.type) {
    case 'N':
      waypoint[0] += this.value
      break
    case 'E':
      waypoint[1] += this.value
      break
    case 'S':
      waypoint[0] -= this.value
      break
    case 'W':
      waypoint[1] -= this.value
      break
    case 'R':
      this.rotate(waypoint, this.value)
      break
    case 'L':
      this.rotate(waypoint, -this.value)
      break
    case 'F':
      position[0] += this.value * waypoint[0]
      position[1] += this.value * waypoint[1]
      break
    }
  }
}

export default class Twelve extends Command {
  static description = 'A solver for Day Twelve'

  static examples = [
    `$ aoc-2020 twelve resources/test-twelve-a.txt
286
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Twelve)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const position = [0, 0]
    const waypoint = [1, 10]
    content.map(x => new Instruction(x).apply(position, waypoint))
    const distance = Math.abs(position[0]) + Math.abs(position[1])
    this.log(`${distance}`)
  }
}
