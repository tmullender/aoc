import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Instruction {
  indexes: Array<number> = []

  values: Array<number> = []

  constructor(input: string) {
    if (input.startsWith('mask')) {
      [...input.slice(7)].forEach((x, i) => {
        if (x !== 'X') {
          this.indexes.push(i)
          this.values.push(parseInt(x, 10))
        }
      })
    } else {
      const match = /mem\[(\d+)] = (\d+)/.exec(input)?.slice(1, 3)
      if (match) {
        this.indexes.push(parseInt(match[0], 10))
        this.values.push(parseInt(match[1], 10))
      }
    }
  }

  isMask() {
    return this.indexes.length > 1
  }

  apply(value: Array<string>) {
    for (let i = 0; i < this.indexes.length; i++) {
      value[this.indexes[i]] = String(this.values[i])
    }
  }
}

export default class Fourteen extends Command {
  static description = 'A solver for Day Fourteen'

  static examples = [
    `$ aoc-2020 fourteen resources/test-fourteen-a.txt
165
`,
  ]

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Fourteen)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x)
    const instructions = content.map(x => new Instruction(x))
    let mask = instructions[0]
    const memory = new Map()
    instructions.forEach(x => {
      if (x.isMask()) {
        mask = x
      } else {
        const binary = (x.values[0] >>> 0).toString(2)
        const value = [...binary.padStart(36, '0')]
        mask.apply(value)
        memory.set(x.indexes[0], parseInt(value.join(''), 2))
      }
    })
    let total = 0
    memory.forEach(v => {
      total += v
    })
    this.log(`${total}`)
  }
}
