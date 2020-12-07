import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

function findOptions(x: string, tree: Map<string, Array<string>>, acc: Set<string>): Set<string> {
  const options = tree.get(x)
  options?.map(acc.add, acc)
  options?.map(x => findOptions(x, tree, acc))
  return acc
}

function extractTypes(desc: string): string[] {
  return desc.split(',').map(y => {
    const match = /\d* ?(\w+ \w+) bag/.exec(y)
    return match ? match[1] : 'unknown'
  })
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
      extractTypes(x[1]).forEach(y => acc.has(y) ? acc.get(y).push(x[0]) : acc.set(y, [x[0]]))
      return acc
    }, new Map())
    const count = findOptions('shiny gold', tree, new Set())
    this.log(`${count.size}`)
  }
}
