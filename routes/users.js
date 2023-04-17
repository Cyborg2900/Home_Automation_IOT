const express=require('express');

const router=express.Router();

const jwt= require('jsonwebtoken');

const bcrypt=require('bcrypt');

const {User_model,Sd_model,Md_model}=require('../db/schema_db');


router.route('/login')
    .post(async (req,res)=>{

        const {email,password}=req.body;

        User_model.findOne({email:email}).then((data)=>{    // extracting the info of user from db
            bcrypt.compare(password,data.password).then((response)=>{
                if(response){
                        const {s_device,m_device}=data;
                        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                            expiresIn: "15m",
                          });
                        const demo={
                            "name":data.name,
                            "single_device":s_device,
                            "multi_device":m_device,
                            "token":token
                        }
                        res.json(demo);
                }else{
                    res.json({'output':'wrong password'});
                }
            }).catch((error)=>{
                console.log(error);
                res.json({'output':"error occured"});
            })


        }).catch((error)=>{
            console.log(error);
            res.json({'output':"email doesn't exists"});
        })
        
    })


router.route('/register')
    .post(async(req,res)=>{
        
    })




router.route('/register')
    .post(async (req,res)=>{
        ///registration of user
        console.log("\n\n\n",req.body);
        // const {email,password}=req.body;


        User_model.findOne({email:req.body.email}).then((data)=>{
            if(data !==null){       // checking whether a email already exits or not 
                res.json({"output":'user already exits'})
                return ;  // getting out of this promise function so that further execution does not happen
            }

            bcrypt.hash(req.body.password,10).then((hash)=>{
                console.log(hash);
                const U_data=new User_model({email:req.body.email, name : req.body.name ,password:hash, s_device:[] , m_device:[]});

                U_data.save().then(()=>{
                    console.log("user added to db");
                    res.send({"output":'user added to db'});
                }).catch((error)=>{
                    console.log(error)
                    res.send({"output":'error occured'});
                })
            }).catch((error)=>{
                console.log(error);
                res.send({"output":"error occured"});
            })

        }).catch((error)=>{
            console.log('\n\n\n',error);
            res.send({"output":'error occured'});
        })

    })


router.route('/device_status')
    .get(async(req,res)=>{
        if(!req.body.token){
            res.status(401).send({"output":"Unauthorized request no token provided"});
        }

        try {
            const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
            if(req.body.type=='m'){
                Md_model.findOne({uid:id}).then((data)=>{
                    const {status_1,status_2,status_3,status_4}=data;
                    res.json({
                        "status_1":status_1,
                        "status_2":status_2,
                        "status_3":status_3,
                        "status_4":status_4,
                })
                }).catch((error)=>{
                    console.log(error);
                    res.send({"output":error});
                })
            }else{
                Sd_model.findOne({uid:id}).then((data)=>{
                    res.json({
                        "status":data.status
                    })
                }).catch((error)=>{
                    console.log(error);
                    res.send({"output":error});
                })
            }
          } catch (err) {
            res.status(400).send({"output":"Invalid token."});
          }

        
    })
    .put(async(req,res)=>{

    })






module.exports=router;