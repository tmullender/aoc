const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Particles', function() {
  describe('Examples', function() {
    it('should return 1', function(done) {
      fs.readFile('day_twenty.example', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 1);
        done();
      });
    });
  });
  describe('Input', function() {
    it('should return ?', function(done) {
      fs.readFile('day_twenty.input', {encoding :'utf8' }, (_, content) => {
        assert.equal(main.play(content), 471);
        done();
      });
    });
  });
});
