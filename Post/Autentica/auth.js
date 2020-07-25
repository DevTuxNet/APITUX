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

router.post("/auth",cors(corsOptions),function authhub(req, res){
    
    var token= localStorage.getItem('token');
    var cpf = req.body.cpf;
    var idchat = req.body.idchat;
    localStorage.setItem('idchat', idchat );
    //localStorage.setItem('idcomp', idcomp );
    const headers = {
        "Accept":"application/json",
        "Authorization": "Bearer " + token 
      };

    var postData = {
      "busca": "cpf_cnpj",
      "termo_busca": cpf
    }
    var url = 'https://api.tuxnet.hubsoft.com.br/api/v1/integracao/cliente'

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
      for (var i = 0; i < body.clientes.length; i++) {
        var cpf_cnpj = body.clientes[i];
        var nome=cpf_cnpj.nome_razaosocial
        if(nome===null || nome==="undefined"){
          localStorage.setItem('nome', "Erro" ); 
        }else{
          localStorage.setItem('nome', nome );
        }
        var obj=cpf_cnpj.cpf_cnpj
        if(obj===null || obj==="undefined"){
          localStorage.setItem('cpf_cnpj', "Erro" ); 
        }else{
          localStorage.setItem('cpf_cnpj', obj );
        }
      }
    })
    var cpf_cnpj= localStorage.getItem('cpf_cnpj');
    if (cpf===cpf_cnpj){
      return res.redirect("boasvindas");
    }
  })


module.exports = router
