var exports = module.exports = {};

exports.dance = function (initial, input) {
  console.log(input)
  var positions = initial.split("")
  const instructions = input.split(",")
  instructions.forEach(function (instruction) {
    const type = instruction.charAt(0)
    const arguments = instruction.substring(1)
    switch (type) {
      case 's':
        positions = spin(positions, arguments);
        break
      case 'p':
        positions = partner(positions, arguments);
        break
      case 'x':
        positions = exchange(positions, arguments);
    }
  })
  return positions.join("")
}

function spin(positions, instruction) {
  const position = positions.length - parseInt(instruction)
  return positions.slice(position).concat(positions.slice(0, position))
}

function exchange(positions, instruction) {
  const splits = instruction.split("/")
  return swap(positions, parseInt(splits[0]), parseInt(splits[1]))
}

function partner(positions, instruction) {
  const splits = instruction.split("/")
  return swap(positions, positions.indexOf(splits[0]), positions.indexOf(splits[1]))
}

function swap(positions, a, b) {
  const c = positions[a]
  positions[a] = positions[b]
  positions[b] = c
  return positions
}
