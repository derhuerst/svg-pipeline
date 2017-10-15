'use strict'

const h = require('snabbdom/h').default
const svgPath = require('svgpath')
const test = require('tape')

const applyTransforms = require('../../lib/apply-transforms')

const path = h('path', {d: 'M10 10 h10 v10 h-10 z'})

const translate = 'translate(1, 2)'
const rotate = 'rotate(15)'
const rotateAround = 'rotate(45, 15, 15)' // around center of the above path
const scale = 'scale(2 3)'
const skewX = 'skewX(.5)'
const skewY = 'skewY(.5)'
const matrix = 'matrix(1, 2, 3, 4, 5, 6)'

const commandsOfPath = (p) => {
  const d = p.data.d || (p.data.attrs && p.data.attrs.d) || null
  if (!d) throw new Error('path: missing d attribute')
  return svgPath(d).segments
}

test('lib/apply-transforms: translate', (t) => {
  const p = applyTransforms(path, [translate])

  t.plan(2)
  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 11, 12])
})

// todo
