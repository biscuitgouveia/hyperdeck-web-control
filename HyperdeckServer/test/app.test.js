import request from 'supertest';
import app from '../app.js';
import {expect} from "chai";

describe("GET /ping", () => {
    it("Should respond with a 200 status code", async () => {
        const response = await request(app).get("/ping").send();

        expect(response.statusCode).to.equal(200);
    })
    it("Should specify JSON in the content type header", async () => {
        const response = await request(app).get("/ping").send();

        expect(response.headers['content-type']).to.include("json");
    })
    it("Contains a message within the response confirming the server is up", async () => {
        const response = await request(app).get("/ping").send();

        expect(response.body.message).to.equal("Server is up.");
    })
})

describe("GET /cliplist", () => {
    describe("General", () => {
        it("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.statusCode).to.equal(200);
        })
        it("Should specify JSON in the content type header", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.headers['content-type']).to.include("json");
        })
        it("Should return a cliplist object", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.body).to.have.property('cliplist');
        })
    })
    describe("cliplist Object", () => {
        it("Should be of type Object", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.body["cliplist"]).to.be.an("object");
        })
        it("Should contain a code of type int32 and value 205", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.body["cliplist"]).to.have.property("code");
            expect(response.body["cliplist"]["code"]).to.be.a("number");
            expect(response.body["cliplist"]["code"]).to.equal(205);
        })
        it("Should contain a clips info array", async () => {
            const response = await request(app).get("/cliplist").send();

            expect(response.body["cliplist"]).to.have.property('clips info');
        })
    })
})
