const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
//1
	describe("GET /", () => {
//2
		it("should return status code 200", (done) => {
//3
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
//4
				done();
			});
		});
	});

	describe("GET /marco", () => {

		it("should confirm that a status code 200 is returned and the body should contain 'polo'", (done) => {
			
			request.get(base + "marco",  (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(body).toBe("polo");

				done();
			});
		});
	});
});