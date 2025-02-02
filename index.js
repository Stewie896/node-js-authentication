require("dotenv").config();
require("./Database/db");

const express = require("express");
const router = require("./Route/routes");
const rts =  require('./FileUploaderRouter/Router')
const app = express();
const PORT =  3000;




app.use(express.json())
app.use('/home' ,  router);
app.use('/images' ,  rts);



app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
