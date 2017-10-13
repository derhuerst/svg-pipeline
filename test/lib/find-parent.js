'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const {textNode, svg} = require('../util')
const findParent = require('../../lib/find-parent')

test('lib/find-parent: root el', (t) => {
	const path = h('path', {}, [
		textNode('Hey!')
	])

	t.plan(1)
	t.equal(findParent(path, path), null)
})

test('lib/find-parent: deeply nested text-only node', (t) => {
	const target = textNode('Hey!')
	const parent = h('path', {}, [target])
	const tree = svg([
		h('g', {}, [parent])
	])

	t.plan(1)
	t.equal(findParent(target, tree), parent)
})
