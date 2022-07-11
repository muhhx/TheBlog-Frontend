const dotenv = require("dotenv");
const express = require("express");
const path = require('path');

dotenv.config()
const app = express()
const distPath = path.join(__dirname, "..", "dist")
const port = process.env.PORT || 3000

app.use(express.static('./dist'));

app.get('*', (req, res) => {
    // res.sendFile(path.join(distPath, 'index.html'))
    res.sendFile('./dist/index.html')
})

app.listen(port, () => {
    console.log("Running")
})