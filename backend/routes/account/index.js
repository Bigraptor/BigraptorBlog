const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Account = require("../../db/account/account.js");
const tokenMiddleware = require("../../middlewares/token");

router.post("/join", (req, res) => {
    let idRegex = /^[a-z0-9]+$/;

    if(!idRegex.test(req.body.id)){
        return res.status(400).json({
            error : "ID Format is wrong",
            code : 1
        });
    } else{
        if(req.body.pw.length < 4){
            return res.status(400).json({
                error : "PassWord is short",
                code : 2
            });
        }else{
            if(req.body.nickname === ""){
                return res.status(400).json({
                    error : "Nickname is Required",
                    code : 3
                });
            } else{
                Account.findOne({id : req.body.id}, (err, exist) => {
                    if(err) throw err;
                    if(exist){
                        return res.status(400).json({
                            error : "ID is exist",
                            code : 4
                        });
                    }else{
                        Account.findOne({nickname : req.body.nickname}, (err, exist) => {
                            if(err) throw err;
                            if(exist){
                                return res.status(400).json({
                                    error : "Nickname is exist",
                                    code : 5
                                });
                            } else{ 
                                Account.count({}, (err, count) => {

                                    let account = new Account({
                                        id : req.body.id,
                                        pw : req.body.pw,
                                        nickname : req.body.nickname,
                                        admin : count === 0 ? true : false
                                    });
    
                                    account.pw = account.generateHash(account.pw);
    
                                    account.save( (err) => {
                                        if(err) throw err;
                                        return res.json({
                                            success: true
                                        });
                                    });
                                });
                                
                            };
                        });
                    };
                });
            };
        };
    };
});

router.post("/login", (req, res) => {
    const secret = req.app.get('jwt-secret');

    Account.findOne({id : req.body.id}, (err, account) => {
        if(err) throw err;
        if(!account){
            return res.status(401).json({
                error : "ID is not exist",
                code : 1
            });
        } else {
            if(!account.validateHash(req.body.pw)){
                return res.status(401).json({
                    error : "PW is Wrong",
                    code : 2
                });
            } else {
                let token = jwt.sign({
                        _id : account._id,
                        id : account.id,
                        admin : account.admin
                    },secret,{
                        expiresIn: '1h',
                        issuer: 'bigraptor.com',
                        subject: 'userInfo'
                });

                res.cookie("user", token);

                res.json({
                    message : "Login Success",
                    token
                });
            
            }
        }
    })
});

router.use("/tokencheck", tokenMiddleware)
router.get("/tokencheck", (req, res) => {
    res.json({
        success : true,
        info : req.decoded
    });
});

module.exports = router;