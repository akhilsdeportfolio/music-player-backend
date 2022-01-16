const express = require('express');
const auth = require('../middlwares/auth');
const router = express.Router();
const Album = require('../models/albums.model');

router.post("/",auth,async (req, res) => {
       const name = req.body.name;
       const songId = req.body.songs;
       const genere = req.body.genere;
       const year = req.body.year;
       const owner = req.body.owner;
       const coverphoto = req.body.pic || null;

       console.log(req.body);


       try {
              let resp = await Album.create({ name, songs: songId, genere, year, owner, coverphoto });
              res.status(201).send(resp);
       }
       catch (e) {
              res.status(500).send({ message: "something went wrong", error: e.message });
       }





});

router.patch("/updateAlbum/:id",auth,async (req, res) => {

});

router.delete("/deleteAlbum/:id",auth,async (req, res) => {

});

module.exports=router;