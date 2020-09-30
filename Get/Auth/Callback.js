const express = require("express");
const router = express.Router();
var request = require('request')

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/callback",function callback(req, res){

    var postData = {
        "grant_type": "authorization_code",
        "redirect_uri": "186.195.8.2:8010/auth/callback",
        "client_id": "APP-e3499c06-dba1-4a75-9320-a74342ee975d",
        "client_secret": "3ce9f321-b3d1-4070-a71b-16b2c315b87d",
        "code": "def502001323ba8b37b4e58218b30b804320c794a0394152aa9712a1477904efa4670ceaab69372e165ce55fee838a928ba4e51e2428cb5bcacdd727c5fc4a0b0eca9f976f0160af2a6123f2a2c3c06ef8f9b87412938db6aa0f651f963f9ea5122088eac5bb1a0593a4d439f0ab48252ff97e2d82d5f9b2acc2f1ae3a12689e5fc40682679ab01d45869dbac4ab1c81d675f4b9421175caea43ef066d35b0342979ed2e73639460861bbf12176ce47d6ffc66a6891a25063125800430a53c520dbf3fe4ea0afb8847f10b0e185b40099599aa12b8f520a5a029605c0e71302fd1e7708b243294ff1657c80ad73891b3da9e18e68791ed44c50ae9fa82ced7a0750a7498736dc60e2e99f1aeaac6897450355b5aa30844d95e2d0416b525867c81c19f263137f47f7ea6e0f1739559c0393869cdf1038b946255105b3cf666681cb829ee279a0e96f79f24bdfdfb6379611050469107ed918e5a5960b4d0f7faba6f3359b11fcbdb03ed5d11b4876c6133df9357b9c9ae2ddef9a8b2ce7bd4e0d82d0cf088bb38c0c1a201388c07e80ac7b53e94da8c3008be39e99a1d79e20ec1843419d52113bf8a1b4f1f"
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
    console.log(body)
    })
})

module.exports = router