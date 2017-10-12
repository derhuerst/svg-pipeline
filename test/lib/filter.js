'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const filter = require('../../lib/filter')

const tree = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
	h('defs', [
		h('path', {id: 'foo', d: 'M10 10 h10'})
	]),
	h('g', {id: 'bar'}, [
		h('circle', {r: '10', cx: '10', cy: '10'})
	]),
	h('circle', {r: '5', cx: '5', cy: '5'})
])

const predicate = (node, parent) => {
	if (node.sel === 'path' && parent.sel === 'defs') return false
	if (node.sel === 'circle' && parent.sel === 'svg') return false
	return true
}

const filtered = h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
	h('defs', []),
	h('g', {id: 'bar'}, [
		h('circle', {r: '10', cx: '10', cy: '10'})
	])
])

test('lib/filter', (t) => {
	t.plan(1)

	filter(tree, predicate) // mutates
	t.deepEqual(tree, filtered)
})
