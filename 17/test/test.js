const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('spinlock 3', function() {
    it('should return 638', function() {
      assert.equal(main.spinlock(3), 1222153);
    });
  });
});

describe('Input', function() {
  describe('spinlock 369', function() {
    it('should return ?', function() {
      assert.equal(main.spinlock(369), 31154878);
    });
  });
})
