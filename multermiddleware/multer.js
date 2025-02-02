const multer = require("multer");
const path = require("path");
const fs = require("fs");

const joinPath = path.join(__dirname, "../../mongoose");

const updatedInstance = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, joinPath);
  },
  filename: (req, file, cb) => {
    let shuffel = Date.now() + " " + file.originalname;
    cb(null, shuffel);
  },
});

// const filterFile  = (req  , file , cb)=>{
//     return  file.mimetype.startsWith('image') ? cb(null , true) : cb(null , false)

// }

// let updatedMUlter = multer({

//     storage: updatedInstance,

// },
// )

const upd = multer({ storage: updatedInstance });

const deletMiddleware = (req, res, next) => {
  if (req.file) {
    const customPath = path.join(
      __dirname,
      "../../mongoose/",
      req.file.filename
    );
    fs.unlink(customPath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted from local storage succesfully");
        next();
      }
    });
  }
  next();
};

module.exports = { upd, deletMiddleware };
