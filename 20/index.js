var exports = module.exports = {};

const pattern = /p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>/

function convert(line) {
  const result = pattern.exec(line)
  const parseField = (x) => parseInt(x)
  return {"p": result.slice(1, 4).map(parseField),
    "v":result.slice(4,7).map(parseField),
    "a":result.slice(7,10).map(parseField)}
}

exports.play = function (content) {
  const lines = content.split("\n").filter((x) => x.length > 0)
  const particles = lines.map(convert)
  var min = Number.POSITIVE_INFINITY
  var particle = particles.length + 1
  for (i=0; i < particles.length; i++){
    const a = particles[i]["a"]
    const total = Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2])
    if (total < min) {
      particle = i
      min = total
    }
  }
  return particle
}
