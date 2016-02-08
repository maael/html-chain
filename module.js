var html = require('./html')
  , jsdom = require('jsdom').jsdom
  , document = jsdom('').defaultView.document
  , htmlModule = html(document)

module.exports = htmlModule