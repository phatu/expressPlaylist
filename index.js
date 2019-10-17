'use strict';

const list = require('./list');
const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
const router = express.Router();
const server = http.createServer(app);
const port = 3090;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res){
    res.send(list);
});

app.use('/', function(req, res){
  list.sort(function(a, b){return b - a});
  res.send(list);
});

//adding a new singer
router.post("/:add", function(req, res){
  const newSinger = {
    id: 5,
    singerName: req.body.singerName
  };

  if (newSinger.singerName.length == 0) {
    return res.json({ message: "Please insert the singer's name." });
  }

  list.push(newSinger);

  fs.writeFile("list.json", JSON.stringify(list));
    
  res.json(list);
}); 


//modifying an exisiting singer
router.post("/:edit", function(req, res){
  for (var a=0; a<list.length; a++) {
    if (list[a].id == req.body.id) {
      list[a].singerName = req.body.singerName;
      res.json({
        message: `(${req.body.id}) has been added to ${req.body.singerName}`
      });
    }
  }
  
  fs.writeFile("list.json", JSON.stringify(list));
   
}); 

//removing a singer 
router.post("/:delete", function(req, res){
  
  const found = list.some(singer => singer.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "singer is deleted",
      list: list.filter(singer => singer.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No singer with the id of ${req.params.id}` });
  }
});


server.listen(port);
console.debug('Server is listening on port ' + port);


















