const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})