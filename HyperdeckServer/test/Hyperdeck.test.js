import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const expect = chai.expect
import sinon from 'sinon'

import Hyperdeck from '../Hyperdeck.js'
import {mockStatus} from "./testConsts.js";
import {Socket} from "net";
import * as assert from "node:assert";

describe('Hyperdeck', () => {
    describe('.startConnection', () => {

    })
    describe('.getStatus', () => {
        it('Returns an Object containing the current transport status', async () => {
            // Arrange
            const hd = new Hyperdeck();
            const fakeSocketOn = sinon.fake.yieldsAsync(mockStatus)
            const fakeSocketWrite = sinon.fake.returns("1");

            const client = hd.getClient();
            sinon.replace(client, "write", fakeSocketWrite);
            sinon.replace(Socket, "on", fakeSocketOn);

            const expectedOutput = {
                "code": 208,
                "transport info:": {
                    "status": "play",
                    "speed": "100",
                    "slot id": "1",
                    "clip id": "12",
                    "single clip": "true",
                    "display timecode": "00:00:02:13",
                    "timecode": "00:00:02:13",
                    "video format": "1080i50",
                    "loop": "true"
                }
            }
            // Act
            const returnedOutput = await hd.getStatus();
            // Assert
            assert.deepEqual(returnedOutput, expectedOutput);
        })
    })
    describe('.getClipList', () => {

    })
    describe('.closeConnection', () => {

    })
    describe('.playClip', () => {

    })
    describe('.stopClip', () => {

    })
    describe('.nextClip', () => {

    })
    describe('.prevClip', () => {

    })
    describe('.loopPlay', () => {

    })
    describe('.cueClip', () => {

    })
    describe('.liveInput', () => {

    })
})