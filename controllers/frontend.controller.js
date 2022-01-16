const e = require('express');
const express = require('express');
const router = express.Router();
const Albums = require('../models/albums.model');



router.get("/",async (req, res) => {
       try {
              const albums = await Albums.find({}).sort({ 'createdAt': 'desc' }).populate('songs').lean().exec();

              if (albums.length > 0) {
                     res.status(200).send({ message: "success", length: albums.length, data: albums });
              }
              else {
                     res.status(200).send({ message: "no albums found in database", length: 0, data: albums })
              }
       }
       catch (e) {

              res.status(500).send({ message: "something went wrong on the server", error: e.message })
       }

});
router.get("/:id", async (req, res) => {

       const albumId = req.params.id;

       try {

              const album = await Albums.findById(albumId).populate('songs').lean().exec();

              console.log(album);

              if (album) {
                     res.status(200).send({ message: "found album", data: album });
              }
              else {
                     res.status(200).send({ message: "no album found", data: album });
              }


       }
       catch (e) {
              res.status(500).send({ message: "something went wrong", error: e.message });
       }



});

module.exports = router;