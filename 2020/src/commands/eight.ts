import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Instruction {
  command: string;

  value: number;

  constructor(input: string) {
    const split = input.split(' ')
    this.command = split[0]
    this.value = parseInt(split[1], 10)
  }

  swap() {
    switch (this.command) {
    case 'acc':
      return false
    case 'jmp':
      this.command = 'nop'
      break
    case 'nop':
      this.command = 'jmp'
      break
    }
    return true
  }
}

function run(instructions: Array<Instruction>) {
  let index = 0
  let acc = 0
  const visited = new Set()
  do {
    const instruction = instructions[index]
    visited.add(index)
    switch (instruction.command) {
    case 'acc':
      acc += instruction.value
      index++
      break
    case 'jmp':
      index += instruction.value
      break
    case 'nop':
      index += 1
      break
    }
  } while (!visited.has(index) && index < instructions.length)
  return [index, acc]
}

export default class Eight extends Command {
  static description = 'A solver for Day Eight'

  static examples = [
    `$ aoc-2020 eight resources/test-eight-a.txt
8
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Eight)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x)
    const instructions = content.map(x => new Instruction(x))
    let result = [0, 0]
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i]
      if (instruction.swap()) {
        result = run(instructions)
        instruction.swap()
        // console.log(i)
        // console.log(result[0])
        if (result[0] === instructions.length) {
          break
        }
      }
    }
    this.log(`${result[1]}`)
  }
}
