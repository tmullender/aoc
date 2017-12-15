const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('1212', function() {
    it('should return 6', function() {
      assert.equal(main.sumDigits("1212"), 6);
    });
  });
  describe('1221', function() {
    it('should return 0', function() {
      assert.equal(main.sumDigits("1221"), 0);
    });
  });
  describe('123425', function() {
    it('should return 4', function() {
      assert.equal(main.sumDigits("123425"), 4);
    });
  });
  describe('123123', function() {
    it('should return 12', function() {
      assert.equal(main.sumDigits("123123"), 12);
    });
  });
  describe('12131415', function() {
    it('should return 4', function() {
      assert.equal(main.sumDigits("12131415"), 4);
    });
  });
});

describe('Input', function() {
  describe('day_one.input', function() {
    it('should return 1060', function () {
      var input = fs.readFile('../day_one.input', function() {
        assert.equal(main.sumDigits(input), 1060)
      })
    })
  })
})
