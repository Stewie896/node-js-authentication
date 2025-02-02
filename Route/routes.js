const express = require('express');
const router = express.Router();
const {loginUser ,registerUser , changePassword} = require('../Controller/Controller');
const middleware = require('../Middleware/middleware')
const jwtMiddleware = require('../Middleware/middleware')
const  imgUPD = require('../ImageUploader/imgupload')

router.post('/login' , loginUser);
router.post('/register' , registerUser)
router.post('/changePassword' , jwtMiddleware , changePassword )



module.exports = router;
8