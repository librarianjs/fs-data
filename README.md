# Librarian FileSystem Data

## Installation

```
$ npm install librarian-fs-data
```

## Usage

```js
var express = require('express')
var librarian = require('librarian')
var FileSystemData = require('librarian-fs-data')

var dataPlugin = new FileSystemData(options) // see below for options
var app = express()
app.use('/files', librarian({
  data: dataPlugin
}))

app.listen(8888, function(){
  console.log('app listening')
})
```

## Options

Options is an object containing any of the following options.

### directory

The files where the records are stored
