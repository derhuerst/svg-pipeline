'use strict'

const test = require('tape')
const {stub} = require('sinon')

const reduceChain = require('../../lib/reduce-chain')

const A = {val: 'A', parent: null}
const B = {val: 'B', parent: A}
const C = {val: 'C', parent: B}

const o0 = {o0: true}
const o1 = {o1: true}
const o2 = {o2: true}
const o3 = {o3: true}

test('lib/reduce-chain', (t) => {
	t.plan(5)

	const fn = stub()
	fn.onFirstCall().returns(o1)
	fn.onSecondCall().returns(o2)
	fn.onThirdCall().returns(o3)

	const res = reduceChain(C, fn, o0)

	t.equal(fn.callCount, 3)
	t.deepEqual(fn.firstCall.args, [o0, C])
	t.deepEqual(fn.secondCall.args, [o1, B])
	t.deepEqual(fn.thirdCall.args, [o2, A])
	t.equal(res, o3)
})
