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

router.get("/callback",function callback(req, res){

    var postData = {
        "grant_type": "authorization_code",
        "redirect_uri": "186.195.8.8:8010/auth/callback",
        "client_id": "APP-e3499c06-dba1-4a75-9320-a74342ee975d",
        "client_secret": "3ce9f321-b3d1-4070-a71b-16b2c315b87d",
        "code": "def5020042133447a0b889e0aa7a417f24ac057a436ab8986dec2f71cfd32bd4a03283275954124cd0b0e7f526717710f72a42064be89e35455dcbd1636af3ba1097809b1e4700ae3d03cbbd3e5ba38984e5609e1ace148996261f8385530b68506f8caee4f1af1c180e54bf2f20952db955833cbcd5e777a7c67c43c25a1726fff9bcae45813e77343ead6f60ccf7b41b9fa8e46da4bea9498abf1f3f5be89d645d666dc5a2d4f57064f553f95493fb302106eee1451798ccb007088f355ebb55b453c43fdde659a1c8f3c116f73840f43224def6fb5341c932fc2350e49f88fe057fdedb30573fa07fde9cacdfda241a3b19645d573bafa5508e079d7b165033b0b4276b1af86ca7cefa75c84157cf02736db2ace9de9f819d1feaa723fee9c8ddd0654e3815d4669a913a43f45c6922ffe90aca63d852f48e07aac6567d609faa4e60ddfc29812b6dfaa5f07ba3a53370f17c0202c58ac77ac710a85aaee7f0ddaf7b911fd196cd6386ba8d4b5d2097e548bc0f46ee792f5d0cae98e0618300c9f8ea5c6b9b9f35595c24d463c0b0f359a95e407be014dbd1fdd61815414a6e38ff160f434791d26ec089"
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
