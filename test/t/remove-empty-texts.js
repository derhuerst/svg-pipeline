'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const {svg, textNode} = require('../util')
const removeEmptyTexts = require('../../t/remove-empty-texts')

test('t/remove-empty-texts: empty text with attrs', (t) => {
  const output1 = {}
  removeEmptyTexts({
    tree: svg([
      h('text', {id: 'foo'}, '')
    ])
  }, output1)

  const output2 = {}
  removeEmptyTexts({
    tree: svg([
      h('text', {id: 'foo'})
    ])
  }, output2)

  t.plan(2)
  t.deepEqual(output1.tree, svg())
  t.deepEqual(output2.tree, svg())
})

test('t/remove-empty-texts: text with \\n and \\t', (t) => {
  const output = {}
  removeEmptyTexts({
    tree: svg([
      h('tspan', {id: 'foo'}, ' \t \n\n\t ')
    ])
  }, output)

  t.plan(1)
  t.deepEqual(output.tree, svg())
})

test('t/remove-empty-texts: tspan, textPath', (t) => {
  const output = {}
  removeEmptyTexts({
    tree: svg([
      h('text', {}, [
        h('tspan', {id: 'foo'}, ' '),
        h('textPath', {id: 'bar'}, ' ')
      ])
    ])
  }, output)

  t.plan(1)
  t.deepEqual(output.tree, svg())
})

test('t/remove-empty-texts: kitchen sink', (t) => {
  t.plan(2)

  const tree = svg([
    h('text', {}, [
      textNode('Hello'),
      h('tspan', {}, 'World!')
    ]),
    h('text', {}, [
      h('tspan', {id: 'foo'}, '')
    ]),
    h('text', {id: 'bar'}, [
      textNode('\n\t')
    ]),
    h('text', {id: 'baz'}, [
      h('textPath', {href: '#p'}, [
        textNode('\n\t')
      ])
    ])
  ])

  const emptied = svg([
    h('text', {}, [
      textNode('Hello'),
      h('tspan', {}, 'World!')
    ])
  ])

  const input = {tree}
  const output = {}
  removeEmptyTexts(input, output)

  t.deepEqual(input, {tree}) // should not be mutated
  t.deepEqual(output, {tree: emptied})
})
