var _ = require('lodash')
var exports = module.exports = {};

const pattern = /p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>/

function convert(line) {
  const result = pattern.exec(line)
  const parseField = (x) => parseInt(x)
  return {position: result.slice(1, 4).map(parseField),
    velocity:result.slice(4,7).map(parseField),
    acceleration:result.slice(7,10).map(parseField)}
}

function move(particle){
  const a = particle.acceleration
  const v = particle.velocity
  const p = particle.position
  for (i=0;i<3;i++){
    v[i] += a[i]
    p[i] += v[i]
  }
}

function positionSort(a, b){
  var result = a.position[0] - b.position[0]
  if (result != 0) {
    return result
  }
  result = a.position[1] - b.position[1]
  if (result != 0) {
    return result
  }
  return a.position[2]-b.position[2]
}

function removeCollisions(particles) {
  const positions = Object.values(_.groupBy(particles, 'position'))
  return positions.filter((v) => v.length == 1).reduce((a,b) => a.concat(b))
}

exports.play = function (content) {
  const lines = content.split("\n").filter((x) => x.length > 0)
  var particles = lines.map(convert)
  for (j=0;j<40 && particles.length > 1;j++) {
    particles.forEach(move)
    particles.sort(positionSort)
    particles = removeCollisions(particles)
  }
  return particles.length
}
