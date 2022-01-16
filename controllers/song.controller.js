const expres=require('express');
const router= expres.Router();
const Song = require('../models/songs.model');



router.post("/",async(req,res)=>{

       const name = req.body.name;
       const creator = req.body.creator;
       const duration = req.body.duration;

       try{   

              const resp = await Song.create({name,creator,duration});

              res.status(200).send(resp);

       }catch(e){
              res.status(500).send({message:"something went wrong",error:e.message});
       }




})

module.exports=router;