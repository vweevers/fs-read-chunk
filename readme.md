# fs-read-chunk

**Read n bytes of an fd or file.**

[![npm status](http://img.shields.io/npm/v/fs-read-chunk.svg?style=flat-square)](https://www.npmjs.org/package/fs-read-chunk) [![node](https://img.shields.io/node/v/fs-read-chunk.svg?style=flat-square)](https://www.npmjs.org/package/fs-read-chunk) [![Travis build status](https://img.shields.io/travis/vweevers/fs-read-chunk.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/fs-read-chunk) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/fs-read-chunk.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/fs-read-chunk) [![Dependency status](https://img.shields.io/david/vweevers/fs-read-chunk.svg?style=flat-square)](https://david-dm.org/vweevers/fs-read-chunk)

## example

```js
const readChunk = require('fs-read-chunk')

readChunk('readme.md', 0, 15, function (err, chunk) {
  console.log(chunk.toString()) // '# fs-read-chunk'
})
```

## `readChunk(mixed, pos, length, callback)`

Where `mixed` is either a filename or a file descriptor.

## install

With [npm](https://npmjs.org) do:

```
npm install fs-read-chunk
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers
