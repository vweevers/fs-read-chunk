'use strict';

const open = require('fs-lotus')
    , fs = require('fs')

function readChunk (fdOrFile, pos, length, done) {
  if (typeof fdOrFile === 'string') {
    return open(fdOrFile, 'r', function (err, fd, close) {
      if (err) return done(err)
      readChunk(fd, pos, length, close.bind(null, done))
    })
  }

  fs.read(fdOrFile, Buffer(length), 0, length, pos, function (err, bytesRead, buf) {
    if (err) return done(err)

    if (bytesRead < length) {
      buf = buf.slice(0, bytesRead)
    }

    done(null, buf)
  })
}

module.exports = readChunk
