# html-chain

[![NPM Version](https://img.shields.io/npm/v/html-chain.svg?style=flat-square)](https://www.npmjs.com/package/html-chain)
[![Build Status](https://img.shields.io/travis/maael/html-chain.svg?style=flat-square)](https://travis-ci.org/maael/html-chain)
[![Code Climate](https://img.shields.io/codeclimate/github/maael/html-chain.svg?style=flat-square)](https://codeclimate.com/github/maael/html-chain)

A super small (only 3.1kB) javascript library to make html by chaining javascript functions.

## Example

```js
var test = html()
    .add('div', {className: 'container', data: { info: 'extraInformation' }})
        .contains('div', {className: 'header'})
            .contains('h5', {className: 'headerTitle', text: 'This is a header'}).end()
        .and('div', {className: 'content'})
            .contains('p', {text: 'This is the content'}).end()
        .end()
    .build();
```

Produces -

```html
<div class="container" data-info="extraInformation">
    <div class="header">
        <h5 class="headerTitle">This is a header</h5>
    </div>
    <div class="content">
        <p>This is the content</p>
    </div>
</div>
```

## Installation

### Node.js

Run
```npm install --save html-chain```
You can then access it with ```var html = require('html-chain');```

### Script

Download and include the ```html.js``` script in your html.

```<script type="text/javascript" src="_PATH_TO_html.js_"></script>```
