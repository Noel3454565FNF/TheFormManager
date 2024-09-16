const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

//app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Service A is running on http://localhost:${port}`);
  });
  
  app.post('/yes', (req, res) => {
    req.accepts('html');
    console.log(req.headers);
    //console.log(req.get('Message'));
    const respau = {
    headers: {
        'Content-Type': 'application/json',
      },
    }
    res.send(respau);
  });
  