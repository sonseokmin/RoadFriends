/* 서버 실행 메인 파일 */

require('dotenv').config(); 
const express = require('express');
const path = require('path');


const app = express();

const route = require("./routes/index.js");

app.use('/images/pests', express.static(path.join(__dirname, 'images/pests')));
app.use('/images/crops', express.static(path.join(__dirname, 'images/crops')));

app.use(express.json()); // body-parsing을 위한 미들웨어어
app.use("/", route)      
app.listen(3000, () => {
    console.log("listening on port 3000");
  });