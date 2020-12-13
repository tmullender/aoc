import {Command} from '@oclif/command'
import {readFileSync} from 'fs'

export default class Thirteen extends Command {
  static description = 'A solver for Day Thirteen'

  static examples = [
    `$ aoc-2020 thirteen resources/test-thirteen-a.txt
    295
`,
  ]

  static flags = {}

  static args = [{name: 'input', required: true}]

  async run() {
    const {args} = this.parse(Thirteen)

    const content = readFileSync(args.input, {encoding: 'UTF8'}).split('\n')
    const earliestDeparture = parseInt(content[0], 10)
    const buses = content[1].split(',').filter(x => /\d+/.test(x)).map(x => parseInt(x, 10)).sort((a, b) => a - b)
    let departureTime = earliestDeparture
    while (departureTime <= earliestDeparture + buses[buses.length - 1]) {
      buses.forEach(bus => {
        const departures = departureTime / bus
        if (departures === Math.floor(departures)) {
          const wait = departureTime - earliestDeparture
          this.log(`${wait * bus}`)
          departureTime += earliestDeparture
        }
      })
      departureTime++
    }
  }
}
