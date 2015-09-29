var assert = require('assert');


describe('MapGenerator', function () {
  describe('Init', function () {
    it('should return a valid object', function () {
      var MapGenerator = require('..');
      assert( typeof MapGenerator === 'object' && MapGenerator );
    });
  });
});
