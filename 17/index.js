var exports = module.exports = {};

exports.spinlock = function (step) {
  var buffer = [0]
  var position = 0
  for (i=1; i <= 2017; i++) {
    position = ((position + step) % buffer.length) + 1
    buffer.splice(position, 0, i)
    // console.log(buffer.join(","))
  }
  return buffer[position +1]
}
