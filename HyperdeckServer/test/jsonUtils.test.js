import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {mockClipList, mockCLipListOutput, mockStatus, mockStatusObject} from "./testConsts.js";
import {Socket} from "net";
import * as assert from "node:assert";
import sinon from 'sinon'
import {jsonifyHyperdeck} from '../utils/jsonUtils.js';

chai.use(chaiAsPromised)
const expect = chai.expect

describe('jsonifyHyperdeck', () => {
    it('Returns processed text data from the Hyperdeck formatted in an object literal.', () => {
        // Arrange
        const inputValue = mockStatus;
        const expectedValue = mockStatusObject;

        // Act
        const outputValue = jsonifyHyperdeck(inputValue);

        // Assert
        expect(outputValue).to.deep.equal(expectedValue);
    })
    it('Returns data as an object literal type.', () => {
        // Arrange
        const inputValue = mockStatus;

        // Act
        const outputValue = jsonifyHyperdeck(inputValue);

        // Assert
        expect(outputValue).to.be.a('object');
    })
    it('Returns a "code" key of type Number.', () => {
        // Arrange
        const inputValue = mockStatus;

        // Act
        const outputValue = jsonifyHyperdeck(inputValue);

        // Assert
        expect(outputValue.code).to.be.a('number');
    })
    it('Removes the file extension (.mov) from clip names.', () => {
        // Arrange
        const inputValue = mockClipList;

        // Act
        const outputValue = jsonifyHyperdeck(inputValue);

        // Assert
        expect(outputValue).to.deep.equal(mockCLipListOutput);
    })
})