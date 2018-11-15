const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

describe("Topic", () => {
	beforeEach((done) => {
     	this.topic;
     	this.post;
     	this.user;

     	sequelize.sync({force: true}).then((res) => {
       		User.create({
         		email: "starman@tesla.com",
         		password: "Trekkie4lyfe"
       		})
       		.then((user) => {
         		this.user = user; 
         		Topic.create({
           			title: "Expeditions to Alpha Centauri",
           			description: "A compilation of reports from recent visits to the star system.",
           			posts: [{
             			title: "My first visit to Proxima Centauri b",
             			body: "I saw some rocks.",
             			userId: this.user.id
           			}]
         		}, {
           			include: {
             		model: Post,
             		as: "posts"
           			}
         		})
         		.then((topic) => {
           			this.topic = topic; 
           			this.post = topic.posts[0]; 
           			done();
         		})
       		})
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
				topicId: this.topic.id,
				userId: this.user.id
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




















