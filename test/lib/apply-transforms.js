'use strict'

const test = require('tape')
const h = require('snabbdom/h').default

const applyTransforms = require('../../lib/apply-transforms')

const path = h('path', {d: 'M10 10 h10 v10 h-10 v-10'})

const translate = {translate: {tx: 10, ty: 20}}
const rotate = {rotate: {angle: 20}}
const scale = {scale: {sx: .5}}
const skewX = {skewX: {angle: .5}}
const skewY = {skewY: {angle: .5}}
const matrix = {matrix: {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}}

test('lib/apply-transforms: translate', (t) => {
	const p = applyTransforms(path, [translate])

	t.plan(1)
	t.deepEqual(p, h('path', {
		d: 'M20 30 h10 v10 h-10 v-10'
	}))
})

// todo
