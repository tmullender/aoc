const assert = require('assert');
const fs = require('fs')
const main = require('../index.js')

describe('Examples', function() {
  describe('65 and 8921', function() {
    it('should return 309', function() {
      assert.equal(main.judgesCount(65, 8921), 309);
    }).timeout(30000);
  });
});

describe('Input', function() {
  describe('699 and 124', function() {
    it('should return ?', function () {
      assert.equal(main.judgesCount(699, 124), 313)
    }).timeout(30000)
  })
})
