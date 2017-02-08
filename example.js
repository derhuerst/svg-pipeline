'use strict'

const sink = require('stream-sink')

const createPipeline = require('.')
const empty = require('./t/empty')

const pipeline = createPipeline()
pipeline.use(empty)

process.stdin
.pipe(sink())
.then((input) => pipeline.run(input))
.then((output) => process.stdout.write(output))
.catch(console.error)
