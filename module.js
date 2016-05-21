var html = require('./html')
  , jsdom = require('jsdom').jsdom
  , document = jsdom('').defaultView.document
  , htmlModule = html.bind(null, document)

module.exports = htmlModule
