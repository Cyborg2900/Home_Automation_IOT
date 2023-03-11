const express=require('express');

const path=require('path');



const app=express();


app.use(express.static(path.join(__dirname,'./front-end-files')));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./front-end-files/login_page.html'));
})


app.listen(5005,()=>{
    console.log('\n\n ----listening to 5005 \n');
})