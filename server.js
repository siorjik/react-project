let express = require('express');
let app = express();

app.use(express.static('public'));

app.listen(3000, ()=>{
  console.log("server on localhost:3000 - is runing!");
});