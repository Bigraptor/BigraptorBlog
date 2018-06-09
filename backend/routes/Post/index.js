const express = require("express");
const router = express.Router();
const Post = require("../../db/post/post.js");

router.post("/write", (req, res) => {
    let post = new Post({
        category : req.body.category,
        title : req.body.title,
        content : req.body.content
    });

    post.save((err) => {
        if(err) throw err;

        return res.json({
            success : true
        });
    });

});

router.post("/load", (req, res) => {
    if(typeof req.body.category !== "undefined"){
        Post.find( {category : req.body.category}, (err, post) => {
            if(err) throw err;
            res.json(post)
        } ).sort({ "created" : -1 })
    } else {
        Post.find((err, load) => {
            if(err) throw err;

            res.json(load);
        }).sort({"created" : -1});
        };
    }
);

module.exports = router;