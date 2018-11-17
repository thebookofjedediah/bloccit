const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Authorizer = require("../policies/application");
const Comment = require("./models").Comment;
const User = require("./models").User;

module.exports = {
	addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getPost(id, callback){
        return Post.findById(id, {
            include: [
                {model: Comment, as: "comments", include: [
                    {model: User }
                ]}
            ]
        })
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deletePost(req, callback){
        return Post.findById(req.params.id)
        .then((post) => {
            const authorized = new Authorizer(req.user, post).destroy();
            if(authorized){
                post.destroy()
                .then((deletedRecordsCount) => {
                    callback(null, deletedRecordsCount);
                });
            } else {
                req.flash("notice", "You are not authorized to do that.");
                callback(401, null);
            }
        })
        .catch((err) => {
            callback(err);
        });
    },
    updatePost(req, updatedPost, callback){
        return Post.findById(req.params.id)
        .then((post) => {
            if(!post){
                return callback(404);
            }
            const authorized = new Authorizer(req.user, post).update();
            if(authorized) {
                post.update(updatedPost, {
                    fields: Object.keys(updatedPost)
                })
                .then(() => {
                    callback(null, post);
                })
                .catch((err) => {
                    callback(err);
                });
            } else {
                req.flash("notice", "You are not authorized to do that.");
                callback(403);
            }
        });
    }
}