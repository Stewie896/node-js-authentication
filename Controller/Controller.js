const model = require("../Models/Models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('dotenv').config;

const loginUser = async (req , res , next) => {
  try{

function jwtBearer(id){ //key pair
  return jwt.sign({value: id} , process.env.JWT_TOKEN ) //unique signature is created
 
}

const {name , email , password} = req.body;
const finder = await model.findOne({email: email});

if(!email){
  let emailerr = new Error("Invalid email")
  return res.json({
  success: false,
  message: emailerr.message
 })
 
}

const loginPass = await bcrypt.compare(password , finder.password)

if(!loginPass){
  return res.json({
    message: "Incorrect password"
  })
}

// console.log(req.userinfo)

const jwtToken = jwtBearer(finder._id)
res.status(201).json({
  success: true,
  wel: `Welcome ${name}`,
  token: jwtToken
})




  }catch(e){
    res.status(404).json({
      success: false,
      message: "Some error occured please try again!"
    })
    console.log(e)

  }
};

const registerUser = async (req, res) => {
      const { name, email , password , role } = req.body;

  try {

    const finder = await model.findOne({
      $or: [{ name: name }, { email: email }],
    });
    if (finder) {
      return res.status(404).json({
        success: false,
        message:
          "Name or email already in use. Log in using your existing email or register with a different name.",
      });
    }

    // Registration logic goes here
    //Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt)


const created = await model.create({
  name,
  email,
   password: hashedPassword,
   role,
  
})

if(created){
  res.status(201).json({
    success: true,
    message: "User registerd succesfully"
  })
}else{
  res.status(404).json({
    suucess: false,
    message: "Unable to register user"
  })
}

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

const changePassword = async (req, res) => {
  try {
      const { oldpassword, newpassword } = req.body;

      const val = req.userinfo.value;
      

      const md = await model.findOne({_id: val});
      
      // console.log  (  "dkfjkfj" , req.userinfo , "THis is idk")

      if (!md) {
          return res.status(404).json({ message: "User not found" });
      }
      
      const compare = await bcrypt.compare(oldpassword, md.password);
      
      if (compare) {
          const salt = await bcrypt.genSalt(10);
          const hashedPass = await bcrypt.hash(newpassword, salt);
          
          md.password = hashedPass;
          await md.save();
          
          res.status(200).json({
              message: "Password changed successfully"
          });
      } else {
          res.status(400).json({
              message: "Old password is incorrect"
          });
      }
  } catch (e) {
      console.log(e, 'jwt iss');
      res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { loginUser, registerUser  , changePassword};
