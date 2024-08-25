import { hyperdeckApi } from '../../src/api/hyperdeckApi.js'
import {
    HyperdeckClipNotFoundError,
    HyperdeckDiskError,
    HyperdeckInternalError,
    HyperdeckNoDiskError,
    HyperdeckRemoteControlDisabledError
} from '../../src/api/hyperdeckErrors.js'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
chai.use(chaiAsPromised)

import sinon from 'sinon'
chai.use(chaiAsPromised)

import { testClipData, testClipOutput, jsonOk } from './hyperdeckApiConsts.js'

describe('hyperdeckApi', () => {
  describe('.selectClip', () => {
    let stub
    beforeEach(() => {
      stub = sinon.stub(global, 'fetch')
    })
    afterEach(() => {
      stub.restore()
    })
    it("Throws HyperdeckNoDiskError if a disk can't be found.", async () => {
      stub.onCall(0).returns(
                jsonOk({
                  data: {
                    message: 'no disk',
                    code: 105
                  },
                  status: 'error'
                })
            )

      await expect(hyperdeckApi.selectClip(4)).to.be.rejectedWith(
                HyperdeckNoDiskError
            )
    })
    it('Throws HyperdeckDiskError if a disk error is detected.', async () => {
      stub.onCall(0).returns(
                jsonOk({
                  data: {
                    message: '106 disk error',
                    code: 106
                  },
                  status: 'error'
                })
            )

      await expect(hyperdeckApi.selectClip(4)).to.be.rejectedWith(
                HyperdeckDiskError
            )
    })
    it('Throws HyperdeckInternalError if an internal error is detected.', async () => {
      stub.onCall(0).returns(
                jsonOk({
                  data: {
                    message: '108 internal error',
                    code: 108
                  },
                  status: 'error'
                })
            )

      await expect(hyperdeckApi.selectClip(4)).to.be.rejectedWith(
                HyperdeckInternalError
            )
    })
    it('Throws HyperdeckRemoteControlDisabledError if remote control is disabled.', async () => {
      stub.onCall(0).returns(
                jsonOk({
                  data: {
                    message: '111 remote control disabled',
                    code: 111
                  },
                  status: 'error'
                })
            )

      await expect(hyperdeckApi.selectClip(4)).to.be.rejectedWith(
                HyperdeckRemoteControlDisabledError
            )
    })
    it('Throws HyperdeckClipNotFoundError if an invalid clip number is passed in as an argument.', async () => {
      stub.onCall(0).returns(
                jsonOk({
                  data: {
                    message: '112 clip not found',
                    code: 112
                  },
                  status: 'error'
                })
            )

      await expect(hyperdeckApi.selectClip(4)).to.be.rejectedWith(
                HyperdeckClipNotFoundError
            )
    })
  })
  describe('.getClipList', () => {
    let stub
    beforeEach(() => {
      stub = sinon.stub(global, 'fetch')
    })
    afterEach(() => {
      stub.restore()
    })
    it('Returns an array of clip names in the form of [key, clipName]', async () => {
      stub.onCall(0).returns(jsonOk(testClipData))

      expect(await hyperdeckApi.getClipList()).to.be.deep.equal(
                testClipOutput
            )
    })
  })
})
