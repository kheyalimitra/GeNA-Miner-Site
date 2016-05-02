// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var str_split = require('../../../../src/php/strings/str_split.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/str_split.js (tested in test/languages/php/strings/test-str_split.js)', function () {
  it('should pass example 1', function (done) {
    var expected = ['Hel', 'lo ', 'Fri', 'end']
    var result = str_split('Hello Friend', 3)
    expect(result).to.deep.equal(expected)
    done()
  })
})
