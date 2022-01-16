const jwt = require("jsonwebtoken");


function verifyToken(token) {
       return new Promise(function (resolve, reject) {

              jwt.verify(token, "akhilkamsala", (err, user) => {
                     if (err)
                            reject(err);

                     resolve(user);
              });
       })
}



async function auth(req, res, next) {



       let token = req.headers.authorization;

       if (!token || !token.startsWith("Bearer "))
              res.status(401).send({ message: "please send a token", error: "no token found" });

       token = token.split("Bearer ")[1];

       try {

              let { user } = await verifyToken(token);
              //let cuser=user;
              delete user['password']
              delete user['createdAt']
              delete user['updatedAt']
              
              req.user = user;
              next();


       }
       catch (e) {
              res.status(500).send({ message: "ALERT!! it seems like your token has been hampered by hackers ", error: e.message });
       }





}
module.exports = auth;