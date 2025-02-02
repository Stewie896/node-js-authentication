const jwt = require("jsonwebtoken");
require('dotenv').config()

const home = (req, res, next) => {
  const verTok = req.header("authorization");
  const trimmedToken = verTok && verTok.split(" ")[1];

  if (!verTok) {
    return res.json({
      success: false,
      message: "Some error occured please try again!",
    });
  }

  try {
    const decode = jwt.verify(trimmedToken, process.env.JWT_TOKEN); //trimmed token = algo : payload + secKey =  ::signature  //sec key is replaced with signature

  req.userinfo = decode;

    next();
  } catch (err) {
    res.json({
      success: false,
      message: "Some error occured please try again!",
    });
  }
};

module.exports = home;
