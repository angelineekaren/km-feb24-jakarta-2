const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/feedback', (req, res) => {
  const feedback = req.body.feedback;
  const filePath = path.join(__dirname, 'feedback.txt');

  fs.appendFile(filePath, `${feedback}\n`, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Feedback saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
