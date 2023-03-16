
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyGDOToken = expressAsyncHandler(async (req, res, next) => {
  // get the token from header.authorization
  let bearerToken = req.headers.authorization;
  // if there is no bearer token
  if (bearerToken == undefined) {
    res.send({ message: "UnAuthorized access..." });
  }
  else {
    let token = bearerToken.split(" ")[1];
    try {
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // check the role
      if (decodedToken.user_role == "GDO") {
        next();
      }
      else {
        res.send({ message: "You have no Permission UnAuthorize Access" });
      }
    } catch (err) {
      res.send({ message: "Session Expires please login again!!" });
    }
  }
});
module.exports = verifyGDOToken;