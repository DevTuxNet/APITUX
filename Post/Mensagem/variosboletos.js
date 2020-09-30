const express = require("express");
const router = express.Router();
var request = require('request')



 
  router.get("/variosboletos",function authhub(req, res){
    res.send("200")
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      const auth = require('../Autentica/auth');
      var id = auth.chatid
      console.log(id)

        var url = 'https://api.huggy.io/v3/chats/'+id+'/tags'
        var postData = {
            "tags": "tag1, tag4"
        } 
        const headers = {
          "Content-Type": "application/json",
          "Accept":"application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiMjgwN2JmOTljMTVhNzlkMmVmNWZjYTIyZDVmYzEyNWIzNWJlNzdmYmFiN2QyNTNiZTI3YTBiYWEzY2Y1NzhmMmU0OTIzNDQwNTk2NThiIn0.eyJhdWQiOiJBUFAtZTM0OTljMDYtZGJhMS00YTc1LTkzMjAtYTc0MzQyZWU5NzVkIiwianRpIjoiY2IyODA3YmY5OWMxNWE3OWQyZWY1ZmNhMjJkNWZjMTI1YjM1YmU3N2ZiYWI3ZDI1M2JlMjdhMGJhYTNjZjU3OGYyZTQ5MjM0NDA1OTY1OGIiLCJpYXQiOjE2MDE0MjMzMjksIm5iZiI6MTYwMTQyMzMyOSwiZXhwIjoxNjA0MDE1MzI5LCJzdWIiOiIxMDg1OSIsInNjb3BlcyI6WyJpbnN0YWxsX2FwcCIsInJlYWRfYWdlbnRfcHJvZmlsZSJdfQ.Yho8eEVDKL2NKgNsSpF53Jb8GyjmdBD7Breu24ozSife-MBGeQmJEdZfs7GDOh4awg-OufMWD-c3o7kRXi7fI0OHzvuX0O-GUfUpWLiT01Nvi75h210DlTel1BQCraB2cksHrvjmaaip51lwFdh20cOE0nBXUqnHX9xhW4c0jJ0"  
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