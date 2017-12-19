var exports = module.exports = {};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

exports.play = function (content) {
  map = []
  content.split("\n").forEach((line) => {
    if (line.length > 0) {
      if (line.indexOf('.') > 0) {
        line = line.substr(0, line.length-1)
      }
      map.push(line.split(""))
    }
  })
  var x = 0
  var y = 0
  for (i=0; i<map[0].length;i++) {
    if (map[0][i] == '|') {
      y = i;
      break;
    }
  }
  var down = function() {
    x+=1
  }
  var left = function() {
    y-=1
  }
  var up = function() {
    x-=1
  }
  var right = function () {
    y+=1
  }
  var inbounds = function(x, y) {
    return (x > -1 && y > -1 && x < map.length && y < map[0].length)
  }
  var move = down
  var directions = [down, left, up, right]
  var count = 0
  var value = map[x][y]
  while (true) {
    while (value != '+' && value != ' ' && inbounds(x, y)) {
      move()
      count += 1
      value = map[x][y]
    }
    if (inbounds(x+1, y) && map[x+1][y] != ' ' && move != up) {
      move = down
    } else if (inbounds(x, y+1) && map[x][y+1] != ' ' && move != left) {
      move = right
    } else if (inbounds(x, y-1) && map[x][y-1] != ' ' && move != right) {
      move = left
    } else if (inbounds(x-1, y) && map[x-1][y] != ' ' && move != down) {
      move = up
    } else {
      return count
    }
    move()
    count += 1
    value = map[x][y]
  }
  return "X"
}
