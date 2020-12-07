import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Rule {
  count: number;

  type: string;

  constructor(desc: string) {
    const match = /(\d*) ?(\w+ \w+) bag/.exec(desc)
    this.count = match && match[1] ? parseInt(match[1], 10) : 0
    this.type = match ? match[2] : 'unknown'
  }
}

function countBags(x: string, tree: Map<string, Array<Rule>>): number {
  const options = tree.get(x)
  let count = 0
  options?.forEach(r => {
    count += (r.count * countBags(r.type, tree)) + r.count
  })
  return count
}

function extractTypes(desc: string): Rule[] {
  return desc.split(',').map(y => new Rule(y))
}

export default class Seven extends Command {
  static description = 'A solver for Day Seven'

  static examples = [
    `$ aoc-2020 seven resources/test-seven-a.txt
4
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Seven)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n').filter(x => x)
    const tree = content.map(x => x.split(/ bags contain /)).reduce((acc, x) => {
      acc.set(x[0], extractTypes(x[1]))
      return acc
    }, new Map())
    const count = countBags('shiny gold', tree)
    this.log(`${count}`)
  }
}
