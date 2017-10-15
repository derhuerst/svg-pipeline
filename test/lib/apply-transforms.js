'use strict'

const h = require('snabbdom/h').default
const svgPath = require('svgpath')
const test = require('tape')

const applyTransforms = require('../../lib/apply-transforms')

const path = h('path', {d: 'M10 10 h20 v10 h-20 z'})

const translate = 'translate(1, 2)'
const rotate = 'rotate(90, 20, 15)' // around center of the above path
const scale = 'scale(2 3)'
const skewX = 'skewX(45)'
const skewY = 'skewY(45)'
// translate(20, 10), rotate(90), scale(1, 2)
const matrix = 'matrix(6.123233995736766e-17, 1, -2, 1.2246467991473532e-16, 20, 10)'

const commandsOfPath = (p) => {
  const d = p.data.d || (p.data.attrs && p.data.attrs.d) || null
  if (!d) throw new Error('path: missing d attribute')

  const path = svgPath(d)
  path.rel()
  path.round(3)

  return path.segments
}
// todo: the tests depend on the output format of svgpath. change this
// e.g. using a bounding box calculation

test('lib/apply-transforms: translate', (t) => {
  const p = applyTransforms(path, [translate])

  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 11, 12])
  t.deepEqual(cmds[1], ['h', 20])
  t.deepEqual(cmds[2], ['v', 10])
  t.deepEqual(cmds[3], ['h', -20])

  t.end()
})

test('lib/apply-transforms: rotate', (t) => {
  const p = applyTransforms(path, [rotate])

  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 25, 5]) // top right corner now
  t.deepEqual(cmds[1], ['l', 0, 20])

  t.end()
})

test('lib/apply-transforms: scale', (t) => {
  const p = applyTransforms(path, [scale])

  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 2 * 10, 3 * 10])
  t.deepEqual(cmds[1], ['h', 2 * 20])
  t.deepEqual(cmds[2], ['v', 3 * 10])
  t.deepEqual(cmds[3], ['h', 2 * -20])

  t.end()
})

test('lib/apply-transforms: skewX', (t) => {
  const p = applyTransforms(path, [skewX])

  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 10 + 10, 10])
  t.deepEqual(cmds[1], ['h', 20])
  t.deepEqual(cmds[2], ['l', 10, 10])
  t.deepEqual(cmds[3], ['h', -20])

  t.end()
})

test('lib/apply-transforms: skewY', (t) => {
  const p = applyTransforms(path, [skewY])

  t.equal(p.sel, 'path')
  const cmds = commandsOfPath(p)
  t.deepEqual(cmds[0], ['M', 10, 10 + 10])
  t.deepEqual(cmds[1], ['l', 20, 20])
  t.deepEqual(cmds[2], ['v', 10])
  t.deepEqual(cmds[3], ['l', -20, -20])

  t.end()
})

test('lib/apply-transforms: matrix', (t) => {
  const path = h('path', {d: 'M0 0 h20 v10 h-20'}) // note the `M0 0`
  const transformed = applyTransforms(path, [matrix])

  t.equal(transformed.sel, 'path')
  const cmds = commandsOfPath(transformed)
  t.deepEqual(cmds[0], ['M', 20, 10]) // top right corner now
  t.deepEqual(cmds[1], ['l', 0, 20])
  t.deepEqual(cmds[2], ['l', -20, 0])
  t.deepEqual(cmds[3], ['l', 0, -20])

  t.end()
})
