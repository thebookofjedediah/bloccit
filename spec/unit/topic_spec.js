const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {
	beforeEach((done) => {
		this.topic;
		this.post;
		sequelize.sync({force: true}).then((res) => {
			Topic.create({
				title: "Holidays",
				description: "Bunches to choose from"
			})
			.then((topic) => {
				this.topic = topic;

				Post.create({
					title: "Thanksgiving",
					body: "Eat some turkey, even if you don't care for it.",
					topicId: this.topic.id
				})
				.then((post) => {
					this.post = post;
					done();
				});
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe("#create()", () => {
		it("should create a topic with a title, body and description", (done) => {
			Topic.create({
				title: "Labor Day",
				description: "In America, we have holidays titled for work"
			})
			.then((topic) => {
				expect(topic.title).toBe("Labor Day");
				expect(topic.description).toBe("In America, we have holidays titled for work");
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe("#getPost()", () => {
		it("should add a post and return the posts with the same associated topic", (done) => {
			Post.create({
				title: "My Birthday",
				body: "Maybe it will be a national holiday one day",
				topicId: this.topic.id
			})
			.then((post) => {
				this.topic.getPosts()
				.then((associatedPosts) => {
					expect(this.topic.id).toBe(post.topicId);
					expect(this.topic.id).toBe(associatedPosts[1].topicId);
					done();
				});
			})
		});
	});
});




















