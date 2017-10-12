'use strict'

const h = require('snabbdom/h').default
const test = require('tape')

const hrefs = require('../../lib/hrefs')

const tree = h('svg', {
	xmlns: 'http://www.w3.org/2000/svg',
	'xmlns:xlink': 'http://www.w3.org/1999/xlink'
}, [
	h('use', {href: '#foo', x: '10', y: '10'}),
	h('use', {href: 'bar.svg#baz', x: '10', y: '10'}),
	h('use', {'xlink:href': '#qux', x: '10', y: '10'})
])

test('lib/hrefs', (t) => {
	t.plan(1)
	t.deepEqual(hrefs(tree).sort(), [
		'#foo', '#qux', 'bar.svg#baz'
	])
})
