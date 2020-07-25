const express = require("express");
const router = express.Router();
var request = require('request')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
var cors = require('cors')
var corsOptions = {
  origin: 'www.huggy.app',
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.post("/boleto",cors(corsOptions),function boleto(req, res){
    
    var token= localStorage.getItem('token');
    var cpf = req.body.cpf;
    var idchat = req.body.idchat;
    localStorage.setItem('idchat', idchat );
    const headers = {
        "Accept":"application/json",
        "Authorization": "Bearer " + token 
      };

    var postData = {
      "busca": "cpf_cnpj",
      "termo_busca": cpf,
      "limit": "1"
    }
    var url = 'https://api.tuxnet.hubsoft.com.br/api/v1/integracao/cliente/financeiro'

    var options = {
      method: 'get',
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
        for (var i = 0; i < body.faturas.length; i++) {
          var boleto = body.faturas[i];
          var boletovencimento = boleto.data_vencimento
          if(boletovencimento===null || boletovencimento==="undefined"){
            localStorage.setItem('boleto', "Erro" ); 
          }else{
          localStorage.setItem('boleto', boletovencimento );
          }
          var link= boleto.link 
          if(link===null || link==="undefined"){
              localStorage.setItem('link', "http://mk.redetuxnet.com.br:8080/mk/tmp/062564514d0c4283f53f045881684885.pdf" ); 
          }else{
                localStorage.setItem('link', link );
          }
        } 
      })
    return res.redirect("enviarboleto");
  })


module.exports = router
