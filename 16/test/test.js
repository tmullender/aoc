const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('dance', function() {
    it('should return baedc', function(done) {
      fs.readFile('day_sixteen.example', {encoding :'utf8' }, function(_, content){
        assert.equal(main.dance('abcde', content.trim()), 'baedc');
        done()
      })
    });
  });
});

describe('Input', function() {
  describe('dance', function() {
    it('should return ?', function(done) {
      fs.readFile('day_sixteen.input', {encoding :'utf8' }, function(_, content){
        assert.equal(main.dance('abcdefghijklmnop', content.trim()), 'kpfonjglcibaedhm');
        done()
      })
    });
  });
})
