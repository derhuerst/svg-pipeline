'use strict'

const h = require('snabbdom/h').default
const test = require('tape')
const {select} = require('snabbdom-selector')

const {svg} = require('../util')
const removeUnusedDefs = require('../../t/remove-unused-defs')

test('t/remove-unused-defs: removes a def from <defs>', (t) => {
  const output = {}
  removeUnusedDefs({
    tree: svg([
      h('defs', {}, [
        h('symbol', {id: 'foo'}),
        h('symbol', {id: 'bar'})
      ]),
      h('use', {href: '#foo'}),
      h('use', {href: '#baz'})
    ])
  }, output)

  const cleaned = svg([
    h('defs', {}, [
      h('symbol', {id: 'foo'})
    ]),
    h('use', {href: '#foo'}),
    h('use', {href: '#baz'})
  ])

  t.plan(1)
  t.deepEqual(output.tree, cleaned)
})

test('t/remove-unused-defs: removes <defs> itself', (t) => {
  const output = {}
  removeUnusedDefs({
    tree: svg([
      h('defs', {}, [
        h('path', {id: 'foo', d: 'M10 10'})
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

test('t/remove-unused-defs: keeps used defs', (t) => {
  const output = {}
  removeUnusedDefs({
    tree: h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    }, [
      h('defs', {}, [
        h('symbol', {id: 'foo'}),
        h('symbol', {id: 'bar'}),
        h('symbol', {id: 'baz'})
      ]),
      h('use', {id: 'hello', href: '#foo'}),
      h('use', {'xlink:href': '#bar'})
    ])
  }, output)

  t.plan(3)
  const symbols = select('defs symbol', output.tree)
  t.ok(symbols[0])
  t.ok(symbols[1])
  t.notOk(symbols[2])
})
