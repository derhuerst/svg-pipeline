'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const empty = require('../../t/empty')

const tree = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
  h('g', [
    h('circle', {r: '10', cx: '10', cy: '10'})
  ]),
  h('path', {id: 'baz', d: 'M10 10 h10'})
])

const emptied = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [])

test('t/empty', (t) => {
  t.plan(2)

  const input = {tree}
  const output = {}
  empty(input, output)

  t.deepEqual(input, {tree}) // should not be mutated
  t.deepEqual(output, {tree: emptied})
})
