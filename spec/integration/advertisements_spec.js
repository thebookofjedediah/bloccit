const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

	beforeEach((done) => {
		this.advertisement;
		sequelize.sync({force: true}).then((res) => {

			Advertisement.create({
				title: "Spikeball",
				description: "The world's best sport"
			})
			.then((advertisement) => {
				this.advertisement = advertisement;
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe("GET /advertisements", () => {
		it("should return a status code 200 and all advertisements", (done) => {
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(err).toBeNull();
				expect(body).toContain("Advertisements");
				expect(body).toContain("Spikeball");
				done();
			});
		});
	});

	describe("GET /advertisements/new", () => {
		it("should render a new advertisement", (done) => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain("New Advertisement");
				done();
			});
		});
	});

	describe("POST /advertisements/create", () => {
		const options = {
			url: `${base}create`,
			form: {
				title: "roundnet sport",
				description: "What's your favorite roundnet team?"
			}
		};

		it("should create a new advertisement and redirect", (done) => {
			request.post(options,
				(err, res, body) => {
					Advertisement.findOne({where: {title: "roundnet sport"}})
					.then((advertisement) => {
						expect(res.statusCode).toBe(303);
						expect(advertisement.title).toBe("roundnet sport");
						expect(advertisement.description).toBe("What's your favorite roundnet team?");
						done();
					})
					.catch((err) => {
						console.log(err);
						done();
					});
				}
			);
		});
	});
});














