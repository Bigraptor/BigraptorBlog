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

router.post("/exactpost", (req, res) => {
    Post.find({no : req.body.no}, (err, post) => {
        if(err) throw err;
        res.json(post);
    });
});

router.post("/writecomment/:no", (req, res) => {
    Post.findOne({no : req.params.no}, (err, post) => {
        
        if(err) throw err;
        console.log(post.comment)
        
        post.comment.push({
            author : req.body.nickname,
            content : req.body.content
        });

        post.save((err) => {
            if(err) throw err;
            res.json({
                success : true
            });
        });
    });
});

router.get("/loadcomment/:no", (req, res) => {
    Post.findOne({no : req.params.no}, (err, comment) => {
        if(err) throw err;

        res.json({
            comment
        });
    });
});

module.exports = router;