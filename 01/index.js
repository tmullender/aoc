var exports = module.exports = {};

exports.sumDigits = function (captcha) {
  const l = captcha.length
  var total = 0
  for (i = 0; i<l; i++) {
    const idx = (i + l/2) % l
    const c = captcha.charAt(i)
    if (c == captcha.charAt(idx)) {
      total += parseInt(c)
    }
  }
  return total
}
