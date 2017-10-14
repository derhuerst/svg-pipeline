'use strict'

const h = require('snabbdom/h').default
const test = require('tape')
const {select} = require('snabbdom-selector')

const {svg, textNode} = require('../util')
const removeMetadata = require('../../t/remove-metadata')

test('t/remove-metadata', (t) => {
  const output = {}
  removeMetadata({
    tree: svg([
      h('metadata', {}, [
        h('foo', {}, [
        	textNode('bar')
        ])
      ]),
      h('circle', {r: '1', cx: '10', cy: '10'})
    ])
  }, output)

  const emptied = svg([
    h('circle', {r: '1', cx: '10', cy: '10'})
  ])

  t.plan(1)
  t.deepEqual(output.tree, emptied)
})
