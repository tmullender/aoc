const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('Maze', function() {
    it('should return ABCDEF', function(done) {
      fs.readFile('day_nineteen.example', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 38);
        done();
      });
    });
  });
});

describe('Input', function() {
  describe('Maze', function() {
    it('should return ?', function(done) {
      fs.readFile('day_nineteen.input', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 16332);
        done();
      });
    });
  });
})
