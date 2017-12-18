var exports = module.exports = {};

function parseField(registers, input) {
  var result = registers[input]
  if (result){
    return result
  }
  return parseInt(input)
}

exports.play = function (content) {
  const instructions = content.split("\n")
  const registers = []
  var lastPlayed = -1
  var i = 0
  while (0 <= i && i < instructions.length) {
    const instruction = instructions[i].split(" ")
    const register = instruction[1]
    if (instruction[0] == "rcv" && registers[register] > 0) {
      break
    }
    switch (instruction[0]) {
      case "set":
        registers[register] = parseField(registers, instruction[2])
        break
      case "add":
        registers[register] += parseField(registers, instruction[2])
        break
      case "mul":
        registers[register] *= parseField(registers, instruction[2])
        break;
      case "mod":
        registers[register] %= parseField(registers, instruction[2])
        break;
      case "snd":
        lastPlayed = registers[register]
        break;
      case "jgz":
        if (registers[register] > 0) {
          i += parseInt(instruction[2]) - 1
        }
        break;
    }
    i += 1
  }
  return lastPlayed
}
