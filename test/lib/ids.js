'use strict'

const h = require('virtual-dom/virtual-hyperscript/svg')
const test = require('tape')

const ids = require('../../lib/ids')

const tree = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
	h('defs', [ // must ignore defs
		h('path', {id: 'foo', d: 'M10 10 h10'})
	]),
	h('g', [
		h('g', {id: 'bar'}, [
			h('circle', {r: '10', cx: '10', cy: '10'})
		]),
		h('path', {id: 'baz', d: 'M10 10 h10'})
	])
])

test('lib/ids', (t) => {
	t.plan(1)
	t.deepEqual(ids(tree).sort(), ['bar', 'baz'])
})
