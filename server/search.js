const api = require('express').Router();

api.get("/", function(req,res,next){
  res.render('index')
})

//for any other requests, send error along
api.use((err,req,res, next) => {
  res.status(500).send(err)
})

api.use((req, res) => {
  res.status(404).end()
})


module.exports = api
