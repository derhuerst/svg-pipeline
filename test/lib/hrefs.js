'use strict'

const h = require('snabbdom/h').default
const snabby = require('snabby')
const test = require('tape')

const hrefs = require('../../lib/hrefs')

const tree1 = h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink'
}, [
  h('use', {href: '#foo', x: '10', y: '10'}),
  h('use', {href: 'bar.svg#baz', x: '10', y: '10'}),
  h('use', {'xlink:href': '#qux', x: '10', y: '10'})
])

const tree2 = snabby `
<svg xmlns="http://www.w3.org/2000/svg">
  <use href="#foo" />
</svg>`

test('lib/hrefs', (t) => {
  t.plan(2)

  t.deepEqual(hrefs(tree1).sort(), ['#foo', '#qux', 'bar.svg#baz'])
  t.deepEqual(hrefs(tree2).sort(), ['#foo'])
})
