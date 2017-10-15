'use strict'

const toPath = require('svg-points/cjs/toPath').default
const svgPath = require('svgpath')
const h = require('snabbdom/h').default

const attrsByType = {
  circle: ['cx', 'cy', 'r'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  line: ['x1', 'x2', 'y1', 'y2'],
  path: ['d'],
  polygon: ['points'],
  polyline: ['points'],
  rect: ['width', 'height', 'x', 'y'] // todo: optional rx, ry
}

// todo: move into an npm package, see colinmeinke/wilderness-dom-node#2
const nodeToShape = (n) => {
  const getAttr = (n, attr) => {
    const val = n.data[attr] || (n.data.attrs && n.data.attrs[attr])
    if (!val) throw new Error(`${n.sel}: missing ${attr} argument`)
    return val
  }

  const attrs = attrsByType[n.sel]
  if (!attrs) throw new Error('unsupported SVG shape ' + n.sel)

  const data = {type: n.sel}
  for (let attr of attrs) data[attr] = getAttr(n, attr)
  return data
}

const applyTransforms = (node, transforms) => {
  // this is a very manual and inefficient process
  // todo: find a less opinionated/monolithic lib than svgpath,
  // ideally on top of the svg-points format
  // todo: find a solution that keeps the original elements instead
  // of translating everything into paths
  // https://github.com/svg/svgo/blob/7718a63b3af5356efc92eef3dd54ff00144170ca/plugins/convertTransform.js#L24
  // https://github.com/svg/svgo/blob/7718a63b3af5356efc92eef3dd54ff00144170ca/plugins/_transforms.js#L236
  // https://github.com/chrvadala/transformation-matrix#functions

  const path = svgPath(toPath(nodeToShape(node)))
  for (let t of transforms) path.transform(t)

  // todo: path.round()?
  // todo: copy attrs
  path.rel() // todo: what about path.abs()?
  return h('path', {d: path.toString()})
}

module.exports = applyTransforms
