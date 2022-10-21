const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()

app.use(cors())

app.use(express.json())

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const filePath = "./answers.json"

app.post("/answers-save", (req, res) => {
  const answerJson = JSON.stringify(req.body)
  fs.writeFile(filePath, answerJson, (err) => {
    if(err) {
      return res.json(err)
    }
    console.log("The file was saved!");
  })
  return res.sendStatus(200)
});

app.get("/answers", (req, res) => {
  fs.readFile(filePath, 'utf8', (err, answersJson) => {
    if(err) {
      return res.json(err)
    }
    res.contentType("application/json")
    res.end(answersJson);
  })
});

