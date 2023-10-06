const request = require("supertest");
const chai = require('chai');
const expect = chai.expect;
import server, { initDB } from "../src/index";

const port = process.env.PORT || 8080;

before(async function () {
    if (process.env.NODE_ENV === 'test') {
        await initDB();
        server.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`)
        });
    }
})

describe("GET /getFee", () => {
    it("should return fee", async () => {
        const res = await request(server).get("/getFee").query({ birthday: '0520102', systemDate: '2021-10-27' });
        expect(res.statusCode).to.equal(200);
        expect(res.body.amount).to.equal(150);
    });
});

describe("POST /getPatient", () => {
    it("should return patient info and fee", async () => {
        const res = await request(server).post("/getPatient").send({ "patientId": 3, "systemDate": "2012-10-27" });
        expect(res.statusCode).to.equal(200);
        expect(res.body.amount).to.equal(150);
    });
});