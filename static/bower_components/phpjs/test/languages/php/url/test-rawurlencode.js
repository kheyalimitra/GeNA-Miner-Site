// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var rawurlencode = require('../../../../src/php/url/rawurlencode.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/url/rawurlencode.js (tested in test/languages/php/url/test-rawurlencode.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin%20van%20Zonneveld%21'
    var result = rawurlencode('Kevin van Zonneveld!')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'http%3A%2F%2Fkvz.io%2F'
    var result = rawurlencode('http://kvz.io/')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    var result = rawurlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
    expect(result).to.deep.equal(expected)
    done()
  })
})
