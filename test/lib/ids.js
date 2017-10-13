'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const {svg} = require('../util')
const ids = require('../../lib/ids')

const tree1 = svg([
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

const tree2 = svg([
	h('path', {id: 'foo', d: 'M10 10 h10'})
])

test('lib/ids', (t) => {
	t.plan(2)

	t.deepEqual(ids(tree1).sort(), ['bar', 'baz'])
	t.deepEqual(ids(tree2).sort(), ['foo'])
})
