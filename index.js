const express = require('express');
const app = express();
const userController = require('./controllers/user.controller');
const appController = require("./controllers/frontend.controller");
const creatorController = require('./controllers/album.controller');
const songController = require('./controllers/song.controller');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/auth",userController);
app.use("/albums",appController);
app.use("/creator",creatorController);
app.use("/creator/songs",songController);
module.exports=app;




