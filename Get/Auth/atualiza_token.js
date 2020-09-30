const express = require("express");
const router = express.Router();
var request = require('request')

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.get("/atualizatoken",function callback(req, res){
    var atualiza = localStorage.getItem('atualizatoken')
    var postData = {
        "grant_type": "refresh_token",
        "client_id": "APP-e3499c06-dba1-4a75-9320-a74342ee975d",
        "client_secret": "3ce9f321-b3d1-4070-a71b-16b2c315b87d",
        "refresh_token": atualiza
      }
    var url = 'https://auth.huggy.app/oauth/access_token'

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
      var validahuggy = body.error;
      console.log(body)
      if(validahuggy ==='invalid_request'){
        localStorage.setItem('tokenhuggy', "0" );
        localStorage.setItem('atualizatoken', "0" );
      }else{
        var tokenhuggy= body.access_token
        var atualizatoken= body.refresh_token
        localStorage.setItem('tokenhuggy', tokenhuggy );
        localStorage.setItem('atualizatoken', atualizatoken );
      }
    })
    res.send("200")
})

module.exports = router