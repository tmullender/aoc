import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

class Field {
  name: string

  starts: number[] = []

  ends: number[] = []

  constructor(match: string[]) {
    this.name = match[1]
    this.starts.push(parseInt(match[2], 10))
    this.ends.push(parseInt(match[3], 10))
    this.starts.push(parseInt(match[4], 10))
    this.ends.push(parseInt(match[5], 10))
  }

  contains(value: number) {
    for (let i = 0; i < this.starts.length; i++) {
      const start = this.starts[i]
      const end = this.ends[i]
      if (start <= value && value <= end) {
        return true
      }
    }
    return false
  }
}

export default class Sixteen extends Command {
  static description = 'A solver for Day Sixteen'

  static examples = [
    `$ aoc-2020 sixteen resources/test-sixteen-a.txt
71
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Sixteen)

    const fields: Array<Field> = []
    const tickets: Array<Array<number>> = []

    readFileSync(args.input, {encoding: 'UTF8'}).split('\n').forEach(x => {
      const field = /(\w+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(x)
      if (field) {
        fields.push(new Field(field))
      }
      if (/^[\d,]+$/.test(x)) {
        tickets.push(x.split(',').map(y => parseInt(y, 10)))
      }
    })
    const invalid: number[] = []
    tickets.forEach(ticket => {
      ticket.forEach(value => {
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].contains(value)) {
            return
          }
        }
        invalid.push(value)
      })
    })

    const validCount = invalid.reduce((acc, x) => acc + x, 0)
    this.log(`${validCount}`)
  }
}
