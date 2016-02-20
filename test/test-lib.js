'use strict'

const path = require('path')
const assert = require('assert')
const FileSystemData = require('../')

const TEST_KEY = 'test-key'
const FAKE_KEY = 'fake-key'

describe('FileSystemData', function(){
  describe('bad config', () => {
    it('should throw with missing options.directory', () => {
      assert.throws(() => new FileSystemData)
    })
  })

  describe('good config', () => {
    var record = {
      id: TEST_KEY,
      name: 'cats.png',
      size: 4444,
      mimeType: 'image/png'
    }

    let plugin
    before(() => {
      plugin = new FileSystemData({
        directory: path.join(process.env.PWD, 'test-data')
      })
    })

    after(() => {
      plugin._destroy()
    })

    it('should init() successfully', function () {
      this.timeout(60 * 1000)
      return plugin.init()
    })

    it('should put() successfully', function () {
      this.timeout(5000)
      return plugin.put(record)
    })

    it('should get() successfully', function () {
      this.timeout(5000)
      return plugin.get(TEST_KEY).then(fetched => {
        assert.deepEqual(record, fetched)
      })
    })

    it('should getAll() successfully', () => {
      return plugin.getAll().then(fetched => {
        assert(Array.isArray(fetched), 'Returned data is not in array form')
        assert(typeof fetched[0] !== 'object', 'Returned records are objects')
      })
    })

    it('should return null for a missing key', () => {
      return plugin.get(FAKE_KEY).then(data => {
        assert.equal(data, null)
      })
    })
  })
})
