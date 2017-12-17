var exports = module.exports = {};

exports.spinlock = function (step) {
  var position = 0
  var result = 0
  for (i=1; i <= 50000000; i++) {
    position = ((position + step) % i) + 1
    if (position == 1) {
      result = i
    }
  }
  return result
}
