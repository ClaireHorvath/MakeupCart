const express = require("express");
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

const {
    getMakeupItems, 
    addMakeupItem, 
    deleteMakeupItem, 
    updateMakeupList
} = require('./controller.js');

app.get('/api/makeupItems', getMakeupItems);
app.post('/api/makeupItems', addMakeupItem);
app.delete('/api/makeupItems/:id', deleteMakeupItem);
app.put('/api/makeupItems/:id', updateMakeupList);

app.listen(7777, () => console.log("Up on port 7777!"));