const express = require("express");
const router = express.Router();
var request = require('request')



 
  router.get("/variosboletos2",function authhub(req, res){
    res.send("200")
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      const auth = require('../Autentica/auth2');
      var id = auth.chatid
      var tokenhuggy = localStorage.getItem('tokenhuggy');

        var url = 'https://api.huggy.io/v3/chats/'+id+'/tags'
        var postData = {
            "tags": "tag1, tag4"
        } 
        const headers = {
          "Content-Type": "application/json",
          "Accept":"application/json",
          "Authorization": "Bearer "+tokenhuggy
      };
        var options = {
        method: 'put',
        body: postData,
        headers,
        json: true,
        url: url
        };
        request(options, function (err, res, body) {
            if (err) {
            console.error('error posting json: ', err)
            throw err
            }
            console.log(body)
        })
  })
    



module.exports = router
