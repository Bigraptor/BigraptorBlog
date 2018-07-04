const express = require("express");
const router = express.Router();
const Post = require("../../db/post/post.js");
const path = require("path");
const multer = require('multer');
const thumb = require('node-thumbnail').thumb;

const upload = multer({ storage: multer.diskStorage({ 
        destination: function (req, file, cb) {
        cb(null, 'images/uploadimage');
        },
        filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
        } 
    })
});

var resultarray = new Array();

router.post("/write", (req, res) => {

    if(typeof resultarray[0] !== "undefined"){
        
    let post = new Post({
        category : req.body.category,
        title : req.body.title,
        content : req.body.content,
        thumbnail : resultarray[0].filename.split(".")[1]
    });

    thumb({
        source: 'images/uploadimage/'+resultarray[0].filename,
        destination: 'images/thumbnail',
        concurrency: 4,
        basename : post._id
      }, function(files, err, stdout, stderr) {
        console.log('All done!');
      });

      post.save((err) => {
          if(err) throw err;
  
          return res.json({
              success : true
          });
      });
    }else{

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
    };
});

router.post("/load", (req, res) => {
    if(typeof req.body.category !== "undefined"){
        Post.find( {category : req.body.category}, (err, post) => {
            if(err) {
                return res.status(404).json({
                error : "post is not exist",
                code : 1
            })};
            res.json(post)
        } ).sort({ "created" : -1 }).skip((req.body.skip-1)*8).limit(8);
    }
});

router.post("/bring", (req, res) => {
    resultarray = new Array();
    Post.find((err, load) => {
        if(err){
            return res.status(404).json({
            error : "post is not exist",
            code : 1
        })};

        res.json(load);
    }).sort({"created" : -1}).skip((req.body.no-1)*8).limit(8);
});

router.post("/exactpost", (req, res) => {
    Post.findOne({no : req.body.no}, (err, post) => {
        if(post === null){ 
            return res.status(404).json({
            error : "page is not exist",
            code : 1
        })};
        res.json(post);
    });
});

router.put("/modify/:no", (req, res) => {
    Post.findOne( { no : req.params.no}, (err, post) => {
        if(err) {
            return res.json({
                error : "error!"
            });
        };

        post.title = req.body.title;
        post.content = req.body.content;

        post.save( (err) => {
            if(err) throw err;

            return res.json({
                success : true
            });
        });
    } );
});

router.delete("/delete/:no", (req, res) => {
    Post.remove( { no : req.params.no }, (err, post) => {
        if(err){
            return res.status(404).json({
                error : "error!"
            });
        };

        res.json({
            success : true
        });
    } );
});

router.post("/writecomment/:no", (req, res) => {
    Post.findOne({no : req.params.no}, (err, post) => {
        
        if(err || post === null) return res.status(404).json({
            error : "commentwrite failed",
            code : 1
        });
        
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
        if(err||comment === null) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

        res.json({
            comment
        });
    });
});

router.post("/exactloadcomment/:no", (req, res) => {
    Post.findOne( { no : req.params.no }, (err, exist) => {
        if(err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

        var comm = exist.comment.filter(function (id) { return id._id == req.body.id });

        res.json({
            comment : comm[0].content
        });
    } );
});

router.put("/modifycomment/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

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
        if (err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

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
        if (err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

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
        if (err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

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
        if(err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

        var comm = exist.comment.findIndex(function (id) { return id._id == req.body.id });
        var result = exist.comment[comm].reply.filter(function (id) { return id._id == req.body.oid });

        res.json({
            comment : result[0].content
        });
    } );
});

router.post("/deletereply/:no", (req, res) => {
    Post.findOne( {no : req.params.no }, (err, exist) => {
        if (err) return res.status(404).json({
            error : "comment is not exist",
            code : 1
        });

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

router.post("/imageupload", upload.single('uploadFile'), (req, res) => {
    resultarray.push(req.file);

    const result = req.file;

    res.json({
        result
    });
});

router.get("/pagination", (req, res) => {
    Post.find((err,post) => {
        var totalpost = post.length;
        if((totalpost%8) === 0){
            var totalpage = totalpost/8;
        }else{
            var totalpage = Math.floor( (totalpost/8)+1 );
        }

        res.json({
            totalpage
        });
    });
});

router.post("/categorypagination", (req, res) => {
    Post.find( {category : req.body.category}, (err, post) => {
        var totalpost = post.length;
        if((totalpost%8) === 0){
            var totalpage = totalpost/8;
        }else{
            var totalpage = Math.floor(totalpost/8)+1;
        }

        res.json({
            totalpage
        });
    } );
});

module.exports = router;