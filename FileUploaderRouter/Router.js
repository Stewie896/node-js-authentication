const {Router} = require('express')
const rts = Router();
const mid  = require('../Middleware/middleware.js');
const {upd} = require('../multermiddleware/multer.js')
const imgupd = require('../ImageUploader/imgupload.js')
const {deletMiddleware}  = require('../multermiddleware/multer')
const {loginUser} = require('../Controller/Controller')

rts.post('/upload' , loginUser , mid ,  upd.single('file1') , imgupd , deletMiddleware);

module.exports = rts;