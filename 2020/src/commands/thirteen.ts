import {Command} from '@oclif/command'
import {readFileSync} from 'fs'
import {Big} from 'big.js'

// stolen from https://en.wikipedia.org/wiki/Modular_exponentiation
function modularExponentiation(a: number, b: number) {
  if (b === 1) {
    return 0
  }
  let base = a % b
  let exponent = b - 2
  let result = 1
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % b
    }
    exponent >>= 1
    base = (base * base) % b
  }
  return result
}

export default class Thirteen extends Command {
  static description = 'A solver for Day Thirteen'

  // Based on https://brilliant.org/wiki/chinese-remainder-theorem/

  static examples = [
    `$ aoc-2020 thirteen resources/test-thirteen-a.txt
    1068781
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Thirteen)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const primes: number[] = []
    const integers: number[] = []
    content[1].split(',').forEach((x, i) => {
      if (x !== 'x') {
        const bus = parseInt(x, 10)
        primes.push(bus)
        integers.push(((10 * bus) - i) % bus)
      }
    })
    const N = primes.reduce((acc, x) => acc * x, 1)
    let departureTime = new Big(0)
    for (let i = 0; i < primes.length; i++) {
      const prime = primes[i]
      const z = Math.floor(N / primes[i])
      departureTime = departureTime.add(new Big(integers[i] * z).mul(modularExponentiation(z, prime)))
    }
    this.log(`${departureTime.mod(N)}`)
  }
}
