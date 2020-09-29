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
        "code": "def5020022ba9b604751379f027bab4d273f984b9d0beb4c76fe30aadb25ce057ca95f8888a29d82a106368631f7babed60c8dd034172ae86565d5d679c764214f58dd05daafdb796907dba160a7afd1ddf76c213985e1037edb717978f4960a748b896b51eb84f468031a05077923242d796551e7fe7a0c8de79ee31f7223318762a05179923d581140cc9e9125d1628d1acecfa58c47766d665503f8985a0201b7678d54ffecfa6bb83aaff0c709eb851167c93e54bb0ea688a2bf2679f51f5e7eadea8a80b2325ff35ad3ce037227e8aea0a4dd16a46d30b21e34be45ae32be5e8aec4cd16b744b33110acf1ef2a1fcb191e160dd7df3b207a991c4745f749e802db1b6a17113d06b0c7a2855c8d1ee28e8d21fbfed6dd8bede1d3cee707c7653786aa50483261cc60570df8eed3626770d2f8172dc0f3e0abd05d285ac2ded677ffe5fd2a410bb1626d71a0ce2f53609bfb4567b3e6bb352997022a9eb24c884a731bea5e44b000a9b9826ae6fad89fbe86faf55f60cf6254c98cd222a4a45beebff3741f20290e3aa1d4f04495d2d52b4551148912023647b361d17f0325fa49846ae94001806a3c83d"
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