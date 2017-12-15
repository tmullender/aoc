var exports = module.exports = {};

const PREFIX = "0000000000000000"

function generatorA(last) {
  return generate(16807, last)
}

function generatorB(last) {
  return generate(48271, last)
}

function generate(factor, last) {
  return last * factor % 2147483647
}

function createBinary(input) {
  const output = PREFIX + (input).toString(2)
  return output.substring(output.length - 16)
}

exports.judgesCount = function (a, b) {
  var total = 0
  for (i=0; i<40000000; i++) {
    var a = generatorA(a)
    var b = generatorB(b)
    const binaryA = createBinary(a)
    const binaryB = createBinary(b)
    if (binaryA == binaryB) {
      total++
    }
  }
  return total
}
