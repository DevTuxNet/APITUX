const express = require("express");
const router = express.Router();
var request = require('request')



 
  router.get("/enviarboleto",function authhub(req, res){
    res.send("200")
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
        var id = localStorage.getItem('idchat');
        var link = localStorage.getItem('link');
        var vencimento = localStorage.getItem('boleto');
        var url = 'https://api.huggy.io/v3/chats/'+id+'/messages'
        var postData = {
            "text": "Segui em anexo a sua fatura do mês "+vencimento,
            "file": link,
            "isInternal": false
        }
        const headers = {
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE5NmM1Zjk3ODFmN2YxOTEwYWI0NzhmYzdkNzk1ZjM0MDc4Mjc4M2VkODQyM2Y2MjMzMWFiNmI0OGQ5YjMwZmFkYWQ3NDIzYjRlOTkxM2U0In0.eyJhdWQiOiJBUFAtYzU2OGU0YWEtMDMyMS00MjVkLWFhOWQtNDQwNjFiZGQ0MTk3IiwianRpIjoiMTk2YzVmOTc4MWY3ZjE5MTBhYjQ3OGZjN2Q3OTVmMzQwNzgyNzgzZWQ4NDIzZjYyMzMxYWI2YjQ4ZDliMzBmYWRhZDc0MjNiNGU5OTEzZTQiLCJpYXQiOjE1OTU2MDgzOTYsIm5iZiI6MTU5NTYwODM5NiwiZXhwIjoxNTk4Mjg2Nzk2LCJzdWIiOiI2MjM3MSIsInNjb3BlcyI6WyJpbnN0YWxsX2FwcCIsInJlYWRfYWdlbnRfcHJvZmlsZSJdfQ.JeCCdRwWAjWzevG3kbhNRbCXCtabxlP33jqo18FhRUz5rRdepolz3XkrZNL5Mc7AL7APmKeSGArvapJJQ-hapr9rS78QDMAOB2WIZKV9RjzoDFEtYAKXUKN7NbHYvvq6CXJs96uLOonQL-2cABIXhJZBNS8mZJmdxqYdARsa2Qs"  
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