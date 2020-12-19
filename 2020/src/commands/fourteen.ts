import {Command} from '@oclif/command'
import {readFileSync} from 'fs'
import {Big} from 'big.js'

class Instruction {
  index = -1

  mask: Array<string> = []

  value = -1

  constructor(input: string) {
    if (input.startsWith('mask')) {
      this.mask = [...input.slice(7)]
    } else {
      const match = /mem\[(\d+)] = (\d+)/.exec(input)?.slice(1, 3)
      if (match) {
        this.index = parseInt(match[0], 10)
        this.value = parseInt(match[1], 10)
      }
    }
  }

  isMask() {
    return this.index === -1
  }

  apply(address: Array<string>): Array<number> {
    let addresses: Array<number> = [0]
    for (let i = 0; i < this.mask.length; i++) {
      const index = address.length - i
      const value = 2 ** (i - 1)
      if (this.mask[index] === 'X') {
        addresses = addresses.concat(addresses.map(x => x + value))
      } else if (this.mask[index] === '1' || address[index] === '1') {
        addresses = addresses.map(x => x + value)
      }
    }
    return addresses
  }
}

export default class Fourteen extends Command {
  static description = 'A solver for Day Fourteen'

  static examples = [
    `$ aoc-2020 fourteen resources/test-fourteen-a.txt
208
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
        // console.log('Mask', mask.mask)
      } else {
        const binary = (x.index >>> 0).toString(2)
        const address = [...binary.padStart(mask.mask.length, '0')]
        // console.log('Address', address)
        mask.apply(address).forEach(a => {
          memory.set(a, x.value)
        })
      }
    })
    let total = new Big(0)
    memory.forEach(v => {
      total = total.add(v)
    })
    this.log(`${total}`)
  }
}
