const router = require("express").Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Post, User, Vote, Comment } = require("../../models");

// get all posts
router.get("/", (req, res) => {
	console.log("======================");
	Post.findAll({
		attributes: [
			"id",
			"title",
			"body",
			"created_at",
		],
		order: [["created_at", "DESC"]], 
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"]
				}
			},
			{
			  model: User,
			  attributes: ["username"]
			}
		]
	})
	.then(dbPostData => res.json(dbPostData))
    .catch(err => {
		console.log(err);
		res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
				"id",
				"title",
				"body",
				"created_at"
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"]
				}
			},
			{
			model: User,
			attributes: ["username"]
			}
		]
	})
	.then(dbPostData => {
		if (!dbPostData) {
		res.status(404).json({ message: "No post found with this id" });
		return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.post("/", withAuth, (req, res) => {
	if (req.session) {
		Post.create({
			title: req.body.title,
			body: req.body.body,
			user_id: req.session.user_id
		})
		.then(dbPostData => res.json(dbPostData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
	}
});

router.put("/:id", withAuth, (req, res) => {
	Post.update(
		req.body,
		{
			where: {
				id: req.params.id
			}
		}
	)
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: "No post found with this id" });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.delete("/:id", withAuth, (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: "No post found with this id" });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;