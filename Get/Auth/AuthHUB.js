const express = require("express");
const router = express.Router();
var request = require('request')
var token_valido
var cors = require('cors')

var corsOptions = {
  origin: 'www.huggy.app',
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.get("/authhub",cors(corsOptions),function authhub(req, res){
  var postData = {
    "grant_type":"password",
    "client_id":"5",
    "client_secret":"vgXuQIxOferJ6txGaJsbFOYuXjELbBMtgfi2dajR",
    "username":"api@huggy.com.br",
    "password":"uiasTRL4T7owOWGsp6cDQUZwrFfTybki"
  }

  var url = 'https://api.tuxnet.hubsoft.com.br/oauth/token'
  var options = {
    method: 'post',
    body: postData,
    json: true,
    url: url
  }
  request(options, function (err, res, body) {
    if (err) {
      console.error('error posting json: ', err)
      throw err
    }
    var token = res.body.access_token
    var type_token = res.body.token_type
    token_valido=token
    localStorage.setItem('token', token_valido);
    
  })
    res.json("Sucesso")
})


module.exports = router