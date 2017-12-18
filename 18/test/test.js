const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('Sounds', function() {
    it('should return 4', function(done) {
      fs.readFile('day_eighteen.example', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 4);
        done();
      });
    });
  });
});

describe('Input', function() {
  describe('Sounds', function() {
    it('should return ?', function(done) {
      fs.readFile('day_eighteen.input', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 4601);
        done();
      });
    });
  });
})
