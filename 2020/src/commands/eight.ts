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
5
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Eight)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x)
    const instructions = content.map(x => new Instruction(x))
    const result = run(instructions)
    this.log(`${result[1]}`)
  }
}
