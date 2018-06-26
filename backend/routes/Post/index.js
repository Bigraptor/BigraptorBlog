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

router.post("/exactloadcomment/:no", (req, res) => {
    Post.findOne( { no : req.params.no }, (err, exist) => {
        if(err) throw err;

        var comm = exist.comment.filter(function (id) { return id._id == req.body.id });

        res.json({
            comment : comm[0].content
        });
    } );
});

router.put("/modifycomment/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) throw err;

        var comm = exist.comment.filter(function (id) { return id._id == req.body.id });
        comm[0].content = req.body.content;

        exist.save((err) => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    });
});

router.post("/deletecomment/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) throw err;

        const index = exist.comment.findIndex( (id) => id._id==req.body.id); //////////댓글배열중에서 선택한값의 _id값으로 인덱스를찾아 삭제
        const result = exist.comment.splice(index, 1);
        
        exist.save((err) => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    });
});

router.post("/reply/:no", (req, res) => {
    Post.findOne( {no : req.params.no}, (err, exist) => {
        if (err) throw err;

        const index = exist.comment.findIndex( (id) => id._id==req.body.id);
        exist.comment[index].reply.push({
            defaultwriter : req.body.author,
            author : req.body.nickname,
            content : req.body.content
        })

        exist.save((err) => {
            if(err) throw err;
            return res.json({
                success : true
            });
        });
    } );
});

router.put("/modifyreply/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) throw err;

        var comm = exist.comment.findIndex(function (id) { return id._id == req.body.id });
        var result = exist.comment[comm].reply.filter(function (id) { return id._id == req.body.oid });
        result[0].content = req.body.content

        exist.save((err) => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    });
});

router.post("/modifyreplyload/:no", (req, res) => {
    Post.findOne( { no : req.params.no }, (err, exist) => {
        if(err) throw err;

        var comm = exist.comment.findIndex(function (id) { return id._id == req.body.id });
        var result = exist.comment[comm].reply.filter(function (id) { return id._id == req.body.oid });
        console.log(result);

        res.json({
            comment : result[0].content
        });
    } );
});

router.post("/deletereply/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) throw err;

        const index = exist.comment.findIndex( (id) => id._id==req.body.id);
        const secondindex = exist.comment[index].reply.findIndex( (id) => id._id == req.body.oid);
        const result = exist.comment[index].reply.splice(secondindex, 1);
        
        exist.save((err) => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    });
});

module.exports = router;