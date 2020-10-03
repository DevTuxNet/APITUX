const express = require("express");
const router = express.Router();
var request = require('request')



 
  router.get("/enviarboleto",function authhub(req, res){
    res.send("200")
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      const boleto = require('../Boleto/boleto');
      var id = boleto.chatid
      var num_boleto1= localStorage.getItem('num_faturas');
      var url = 'https://api.huggy.io/v3/chats/'+id+'/messages'
      var tokenhuggy = localStorage.getItem('tokenhuggy');
      if (num_boleto1==="1"){
        var link = boleto.link
        var vencimento = boleto.venci
        console.log(id,link, vencimento)
        var postData = {
            "text": "Segue em anexo a sua fatura do mês "+vencimento,
            "file": link+".pdf",
            "isInternal": false
        }
        const headers = {
          "Content-Type": "application/json",
          "Accept":"application/json",
          "Authorization": "Bearer "+tokenhuggy 
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
          console.log(body)
      })
      }
      else{
        var link1 = boleto.link1
        var vencimento1 = boleto.venci1
        var link2 = boleto.link2
        var vencimento2 = boleto.venci2
        //console.log(id,link1, vencimento1)
        //console.log(id,link2, vencimento2)
        var postData = {
            "text": "Segui em anexo a sua fatura do mês "+vencimento1,
            "file": link1+".pdf",
            "isInternal": false,
        }
        var postData1 = {
          "text": "Segui em anexo a sua fatura do mês "+vencimento2,
          "file": link2+".pdf",
          "isInternal": false,
      }
        const headers = {
          "Content-Type": "application/json",
          "Accept":"application/json",
          "Authorization": "Bearer "+tokenhuggy  
      };
      var options = {
      method: 'post',
      body: postData,
      headers,
      json: true,
      url: url
      } 

      var options1 = {
        method: 'post',
        body: postData1,
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

      request(options1, function (err, res, body) {
        if (err) {
        console.error('error posting json: ', err)
        throw err
        }
        
    })

      }  
  })
    



module.exports = router
