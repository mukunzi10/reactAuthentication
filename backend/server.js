//server file
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const db=require('./db/config.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('images'));
app.use(express.static('files'));
app.use(express.static('videos'));
app.use(express.static('audio'));
app.use(express.static('documents'));
app.listen(8080, () => {
  console.log('Server is running on port 3000');
})

