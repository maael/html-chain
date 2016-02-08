var assert = require('assert')
  , jsdom = require('jsdom').env
  , basicSuite = require('./basicSuite')
  , callSuite = function (html) { basicSuite(html) }
  , html

describe('browser specific', function () {
  before(function (done) {
    jsdom(''
      , [ 'file://' + __dirname + '/../html.js' ]
      , function (err, window) {
          if (!err && typeof window.html !== 'function') err = new Error('html.js not instantiated')
          html = window.html()
          done(err)
        }
    )
  })

  it('should register html in document correctly', function () {
    assert.equal(typeof html, 'object')
    basicSuite('browser', html)
  })
})