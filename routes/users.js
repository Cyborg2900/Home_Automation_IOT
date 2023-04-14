const express=require('express');

const router=express.Router();

const {User_model,Sd_model,Md_model}=require('../db/schema_db');

router.route('/api')
    .post(async (req,res)=>{
        console.log("\n\n\n",req.body);
        // const {email,password}=req.body;


        User_model.findOne({email:req.body.email}).then((data)=>{
            if(data !==null){       // checking whether a email already exits or not 
                res.json({"output":'user already exits'})
                return ;  // getting out of this promise function so that further execution does not happen
            }

            const U_data=new User_model({email:req.body.email, name : req.body.name ,password:req.body.password, s_device:[] , m_device:[]});

            U_data.save().then(()=>{
                res.send({"output":'user added to db'});
            }).catch((error)=>{
                console.log(error)
                res.send(error);
            })

        }).catch((error)=>{
            console.log('\n\n\n',error);
            res.send({"output":'error occured'});
        })

    })


router.route('/device_status')
    .get(async(req,res)=>{
        
    })
    .put(async(req,res)=>{

    })

router.route('/login')
    .post(async (req,res)=>{

        const {email,password}=req.body;

        User_model.findOne({email:email}).then((data)=>{    // extracting the info of user from db
            if(data.password==password){
                const {s_device,m_device}=data;
                const demo={
                    "name":data.name,
                    "single_device":s_device,
                    "multi_device":m_device,
                }
                res.json(demo);
            }else{
                res.json({'output':'wrong password'});
            }


        }).catch((error)=>{
            console.log(error);
            res.send(error);
        })
        
    })




module.exports=router;