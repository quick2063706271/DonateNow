const express = require('express')
const path = require('path')
const app = express()

const CLIENT_DIR = "../client/build";

app.use(express.static(path.join(__dirname, CLIENT_DIR)));

app.get('/home', function (req, res) {
  res.send('Hello World')
})

app.listen(5000, "0.0.0.0", () => {
	console.log("Listening on port 5000...")
});