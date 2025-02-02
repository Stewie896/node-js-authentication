const cloudinary = require("../CLOUDINARY-CONFIG/Cloudinary");
const imgModel = require("../ImgSchema/Images");
const { fileReciver } = require("../helpers/cloudnaryhelper");

const uploader = async (req, res, next) => {
  try {
    if (!req.file.path) {
      res.json({
        message: "NO FILE FOUND",
      });
    } //FILE IS FOUND TILL HERE OK PROCESSING SMOOTHLY

    const putFile = await fileReciver(req.file.path);
    res.send(putFile);
    const { url, public_id } = putFile;

    const model = await imgModel.create({
      url: url,
      publicId: public_id,
    });

    next();
  } catch (e) {
    res.send("Error in img upload dir");
    next(e);
  }
};

module.exports = uploader;
