'use strict';

const test = require('tape')
    , fs = require('fs')
    , readChunk = require('.')

test('fd', function (t) {
  t.plan(4)

  fs.open(__filename, 'r', function(err, fd) {
    t.ifError(err, 'no open error')

    readChunk(fd, 0, 12, function (err, chunk) {
      t.ifError(err, 'no chunk error')
      t.is(String(chunk), "'use strict'")

      fs.close(fd, (err) => {
        t.ifError(err, 'no close error')
      })
    })
  })
})

test('filename', function (t) {
  t.plan(2)

  readChunk(__filename, 0, 12, function (err, chunk) {
    t.ifError(err, 'no chunk error')
    t.is(String(chunk), "'use strict'")
  })
})

test('slices buffer', function (t) {
  t.plan(3)

  fs.stat(__filename, function (err, stat) {
    t.ifError(err, 'no stat error')

    readChunk(__filename, stat.size, 12, function (err, chunk) {
      t.ifError(err, 'no chunk error')
      t.is(chunk.length, 0)
    })
  })
})

test('closes fd on error', function (t) {
  t.plan(3)

  const close = fs.close
      , read = fs.read

  fs.close = function (fd, done) {
    close.call(fs, fd, function (err) {
      t.ifError(err, 'no close error')
      done()
    })
  }

  fs.read = function (fd, buf, offset, length, pos, done) {
    read.call(fs, fd, buf, offset, length, pos, function (err) {
      t.ifError(err, 'no read error')
      done(new Error('test'))
    })
  }

  readChunk(__filename, 0, 12, function (err, chunk) {
    t.is(err && err.message, 'test', 'got error')
  })
})
