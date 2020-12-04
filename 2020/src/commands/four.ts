import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function hairColourValidation(x: string): boolean {
  const type = x.substring(x.length - 2)
  const value = parseInt(x.substring(0, x.length - 2), 10)
  if (type === 'in') {
    return value >= 59 && value <= 76
  }
  return value >= 150 && value <= 193
}

const required_keys: { [key: string]: (x: string) => boolean } = {
  byr: x => parseInt(x, 10) >= 1920 && parseInt(x, 10) <= 2002,
  iyr: x => parseInt(x, 10) >= 2010 && parseInt(x, 10) <= 2020,
  eyr: x => parseInt(x, 10) >= 2020 && parseInt(x, 10) <= 2030,
  hgt: hairColourValidation,
  hcl: x => /^#[0-9a-f]{6}$/.test(x),
  ecl: x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x),
  pid: x => /^\d{9}$/.test(x),
}

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
  const fields = Object.keys(required_keys)
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const value = passport.get(field)
    if (!value || !required_keys[field](value)) {
      return 0
    }
  }
  return 1
}

export default class Four extends Command {
  static description = 'A solver for Day Four'

  static examples = [
    `$ aoc-2020 four resources/test-four-a.txt
4
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
