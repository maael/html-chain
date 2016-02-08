var assert = require('assert')

module.exports = function (suiteName, html) {
  describe(suiteName + ' basic suite', function () {
    describe('exposed functions', function () {
      function exposeCheck (func) {
        it('should expose ' + func, function () {
          assert.equal(typeof html[func], 'function')
        })
      }
      [ 'add', 'and', 'contains', 'end', 'build' ].forEach(exposeCheck)
    })

    function basicSuite (func) {
      it('should build correctly formatted html', function () {
        var body = html[func]('div').build()
        assert.equal(body, '<div></div>')
      })

      it('should build html with classes', function () {
        var body = html[func]('div', { class: 'testing' }).build()
        assert.equal(body, '<div class="testing"></div>')
      })

      it('should build html with content', function () {
        var body = html[func]('p', { text: 'Testing Text' }).build()
        assert.equal(body, '<p>Testing Text</p>')
      })

      it('should build html with data attributes', function () {
        var body = html[func]('div', { data: { test: 'testing' } }).build()
        assert.equal(body, '<div data-test="testing"></div>')
      })

      it('should add elements within an element contained by another', function () {
        var body = html[func]('div').contains('a')[func]('p').build()
        assert.equal(body, '<div><a></a><p></p></div>')
      })
    }

    describe('add', function () {
      basicSuite('add')
    })

    describe('and', function () {
      basicSuite('and')
    })

    describe('contains', function () {
      it('should allow nesting of elements', function () {
        var body = html.add('div').contains('a').build()
        assert.equal(body, '<div><a></a></div>')
      })
    })

    describe('build', function () {
      it('should build multiple times independently', function () {
        var body = html.add('a').build()
          , body2 = html.add('p').build()
        assert.equal(body, '<a></a>')
        assert.equal(body2, '<p></p>')
      })
    })
  })
}