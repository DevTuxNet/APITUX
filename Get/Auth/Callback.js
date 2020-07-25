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
        "client_id": "APP-c568e4aa-0321-425d-aa9d-44061bdd4197",
        "client_secret": "3e23b0b6-3b45-4def-ba6f-fecf6a69d7a0",
        "code": "def50200ca3f843a4852a5848187822b8c743824cb6bdd03799c39e728ac32b39a286b77490c8e2dad9892c3f82f59be25e571d0349c0c764541f5f75675db011c9b20f0577d313f7b04d645b8ed64b37f66d0eb189a40de8be6338ed4962f0644039afad7c97891d28cb8552b2cba136547c9771f83ca5617b060ed64632733abc7313d64c6120ad20f97ef3051ce98b68409389a33e1aad42d1ba3a426d421f1437d5cf4ab0e715e988249721ab07f089c110638aa0b8f51af6297dc5eb8ae4f1713440d3c5b0e6f4c1a2b13d6da956c491486de4f579b1b8a81fa213da00f585f43310214ded7043a9786cf21a4c830bc8d29b68a009a3c933874365d98a1d6e06c172a744f6c582c6fbef10f20622e8de6f929b54dc1861aa58203a1496c4b0a08ea8bcdc6d12eb5b4f274345d3269ca911078b6e9f2a5b6ca86e3a59d242d1551b1f6449eb2c8ab6808e0c7dfd1786c94524d52e9d2e415d00959ddfcce9951ed31e9fad70070afb65a43b6da8f1525a3ea246916e0ced1bb31104c75c7368db4df065c792ddcd2f1266b9b87224ab4266e7088e09d5a47076656383204cbb542bae337fc66ae8783f7cd0463e34de6b8c3d8b8d30c2383ccd442f4"
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