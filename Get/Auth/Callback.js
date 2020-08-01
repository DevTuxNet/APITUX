const express = require("express");
const router = express.Router();
var request = require('request')

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/callback",function callback(req, res){

    var postData = {
        "grant_type": "authorization_code",
        "redirect_uri": "66170537b2fe.sn.mynetname.net:8010/auth/callback",
        "client_id": "APP-e3499c06-dba1-4a75-9320-a74342ee975d",
        "client_secret": "3ce9f321-b3d1-4070-a71b-16b2c315b87d",
        "code": "def50200dfed455298f62975f4e63ac3fc069ad9174fa4356172d53d61e2a6b33e931d43901e0dffae4af2e7735d208d86749db3672b4a347aed6c338f6b50a67ae47d71bb5f89545db4a5960547483676c1954ac1a55c68e926f5ca3bea0a52584a0e04976c57aa1cc33791d6fc7e5bf77506097f5469e49b032454ead5f3d0a55c4a01b72f12be1ea5ecbcdf818dc8f29d619786e2e52c34b920611b9c9f211380d6e876ea11f7ca79256bb82b09b4590d39fae5db85fd982bfb796ae81c3c9cebf073e80abcfc0bf536a85363f3c727e7c660d99fc8b0bcce17cf79665095d88155f24b2a4e2ce54974965624c18144a1bb6c8d13d5fba1ac3878397c478ab4f589d060fec89c13d3264ca212300b91d37ed941de3fb7050b9c8d724cb2bc38f3047ab5fffc4bffc5471306767c420f3601f192bb820ca405baf336a9428b718f566d26890d6fcbda074c4b928658c259de855e6e9a2ab10b0791c48e84a6919be96e7ac8483a2733b56ae902a6d03b34b71879e3d64fcfa651ab12a6ea7ae90ce129e3ab5f2d58686531b2cb406092a309d5f0529e4302df5dd0b18d10910c2aa09acfa74631ed925329978995b01b100469691903a3aead681b1823"
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