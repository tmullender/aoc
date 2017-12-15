var exports = module.exports = {};

const PREFIX = "0000000000000000"

function generatorA(last) {
  return generate(16807, 4, last)
}

function generatorB(last) {
  return generate(48271, 8, last)
}

function generate(factor, criteria, last) {
  var next = last
  do {
    next = generateNext(factor, next)
  } while (next % criteria != 0)
  return next
}

function generateNext(factor, last) {
  return last * factor % 2147483647
}

function createBinary(input) {
  const output = PREFIX + (input).toString(2)
  return output.substring(output.length - 16)
}

exports.judgesCount = function (a, b) {
  var total = 0
  for (i=0; i<5000000; i++) {
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
