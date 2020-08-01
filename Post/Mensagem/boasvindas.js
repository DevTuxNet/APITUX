const express = require("express");
const router = express.Router();
var request = require('request')




  router.get("/boasvindas",function authhub(req, res){
    res.send("200")
    
      const auth = require('../Autentica/auth');
        var nome = auth.titular
        var id = auth.chatid
        var url = 'https://api.huggy.io/v3/chats/'+id+'/messages'
        var postData = {
            "text": "Olá "+nome+"!, como posso ajudar?",
            "isInternal": false
        }
        const headers = {
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1NTZjZTljMDhjMDZmYmNkMDIzMGI1MmJjNDUxMWQzMTVmMmI4YzBhYWI3MGNmMDI4YzY2Y2RlMGFmNTZjN2M2MjJkNThkNThlMzZhYjQ0In0.eyJhdWQiOiJBUFAtZTM0OTljMDYtZGJhMS00YTc1LTkzMjAtYTc0MzQyZWU5NzVkIiwianRpIjoiZTU1NmNlOWMwOGMwNmZiY2QwMjMwYjUyYmM0NTExZDMxNWYyYjhjMGFhYjcwY2YwMjhjNjZjZGUwYWY1NmM3YzYyMmQ1OGQ1OGUzNmFiNDQiLCJpYXQiOjE1OTYyMzUxMTYsIm5iZiI6MTU5NjIzNTExNiwiZXhwIjoxNTk4OTEzNTE2LCJzdWIiOiI2MzMwMiIsInNjb3BlcyI6WyJpbnN0YWxsX2FwcCIsInJlYWRfYWdlbnRfcHJvZmlsZSJdfQ.YjrmLHtQa6Wv07L5Fd7wSfCgWDhj8ZkOPfBGnYigFOFG635wHFgLu7MdiOcHAev0GZDuHxn_xKReLe8dngGM-kdBduZHbSBs1HSlQFcEWzIcY4LZglmtW69xBWygntReWcMzoaJBVRHZduE7I3nXfTrEjLLGAgZPNZDOpeJ5reE"  
        };
        var options = {
        method: 'post',
        body: postData,
        headers,
        json: true,
        url: url
        } 
        request(options, function (err, res, body) {
            if (err) {
            console.error('error posting json: ', err)
            throw err
            }
        })
  })
    



module.exports = router