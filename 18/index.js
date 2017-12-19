var exports = module.exports = {};

function Program(id, instructions) {
  this.id = id
  this.instructions = instructions
  this.queue = []
  this.registers = {"p":id}
  this.running = true
  this.sent = 0
}

Program.prototype.run = function(i, other) {
  this.running = true
  while (this.running) {
    const instruction = this.instructions[i].split(" ")
    const update = this.process(instruction, other)
    i += update
    this.running = (update != 0 && 0 <= i && i < this.instructions.length)
  }
  return i
}

Program.prototype.process = function (instruction, other) {
  const register = instruction[1]
  switch (instruction[0]) {
    case "set":
      this.registers[register] = this.parseField(instruction[2])
      break
    case "add":
      this.registers[register] += this.parseField(instruction[2])
      break
    case "mul":
      this.registers[register] *= this.parseField(instruction[2])
      break;
    case "mod":
      this.registers[register] %= this.parseField(instruction[2])
      break;
    case "snd":
      other.queue.unshift(this.parseField(register))
      other.running = true
      this.sent += 1
      break;
    case "rcv":
      var update = this.queue.pop();
      if (typeof update != 'undefined') {
        this.registers[register] = update;
      } else {
        return 0
      }
      break;
    case "jgz":
      if (this.parseField(register) > 0) {
        return this.parseField(instruction[2])
      }
      break;
  }
  return 1
}

Program.prototype.parseField = function (input) {
  var result = this.registers[input]
  if (typeof result != 'undefined'){
    return result
  }
  return parseInt(input)
}

exports.play = function (content) {
  const instructions = content.split("\n")
  const zero = new Program(0, instructions)
  const one = new Program(1, instructions)
  var io = 0, iz = 0
  while (one.running || zero.running) {
    io = zero.run(io, one)
    iz = one.run(iz, zero)
  }
  return one.sent
}
