# html-chain
A super small (only 2.7kB) javascript library to make html by chaining javascript functions.

## Example

```js
var test = html()
    .add('div', {className: 'container'})
        .contains('div', {className: 'header'})
            .contains('h5', {className: 'headerTitle', text: 'This is a header'}).end()
        .and('div', {className: 'content'})
            .contains('p', {text: 'This is the content'}).end()
        .end()
    .build();
```

Produces -

```html
<div class='container'>
    <div class='header'>
        <h5 class='headerTitle'>This is a header</h5>
    </div>
    <div class='content'>
        <p>This is the content</p>
    </div>
</div>
```
