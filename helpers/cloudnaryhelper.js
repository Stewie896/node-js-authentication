const cloudinary = require('../CLOUDINARY-CONFIG/Cloudinary');

const fileReciver = async(path)=>{
    try{
const result = await cloudinary.uploader.upload(path , (err , result)=>{
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
});
// console.log(result)


    if(result){
    let url = result.url
    let public_id = result.public_id
return{
    url,
    public_id
}

    }

}catch(e){
        console.log( e);
    }
}
module.exports = {fileReciver};