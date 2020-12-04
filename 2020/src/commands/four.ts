import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

const required_keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

function parseLine(line: string): Map<string, string> {
  return line.trim().split(' ').reduce((acc, x) => {
    if (x.length === 0) {
      return acc
    }
    const field = x.split(':')
    acc.set(field[0], field[1])
    return acc
  }, new Map())
}

function isValid(passport: Map<string, string>): number {
  for (let i = 0; i < required_keys.length; i++) {
    if (!passport.has(required_keys[i])) {
      return 0
    }
  }
  return 1
}

export default class Four extends Command {
  static description = 'A solver for Day Four'

  static examples = [
    `$ aoc-2020 four resources/test-four-a.txt
2
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Four)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const passports: Array<Map<string, string>> = [new Map()]
    let validCount = 0
    content.forEach(line => {
      const map = parseLine(line)
      if (map.size === 0) {
        validCount += isValid(passports[passports.length - 1])
        passports.push(map)
      } else {
        map.forEach((v, k) => passports[passports.length - 1].set(k, v))
      }
    })
    this.log(`${validCount}`)
  }
}
