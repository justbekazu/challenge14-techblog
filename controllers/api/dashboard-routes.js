const router = require("express").Router();
const { Post, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  console.log("======================");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comments,
        attributes: ["id", "comments_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comments,
        attributes: ["id", "comments_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        console.log("here");
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/create-posts", withAuth, (req, res) => {
  res.render("create-posts");
});

router.get("/user-comments", withAuth, (req, res) => {
  console.log(req.session.user_id);
  console.log("======================");
  Comments.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "comments_text", "post_id", "user_id", "created_at"],
    include: [
      {
        model: Post,
        attributes: ["id", "post_content", "title", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const comments = dbPostData.map((post) => post.get({ plain: true }));
      res.render("user-comments", {
        comments,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/single-comment/:id", withAuth, (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "comments_text", "post_id", "user_id", "created_at"],
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }

      const comment = dbPostData.get({ plain: true });
      res.render("single-comment", {
        comment,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
