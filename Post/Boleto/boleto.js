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

    async function boleto(){ 
      let promessa = new Promise((resp,rej)=>{
        request(options, function (err, res, body) {
          if (body.faturas.length===1){
            for (var i = 0; i < body.faturas.length; i++) {
              var boleto = body.faturas[i];
              var boletovencimento = boleto.data_vencimento
              if(boletovencimento===null || boletovencimento==="undefined"){
                localStorage.setItem('boleto', "0" ); 
              }else{
                localStorage.setItem('boleto', boletovencimento );
              }
              var link= boleto.link
              if(link===null || link==="undefined"){
                localStorage.setItem('link', "0" ); 
              }else{
                localStorage.setItem('link', link );
              }
            }
            localStorage.setItem('vetor', "1" );
            resp(true)
          }else{
            localStorage.setItem('vetor', "0" ); 
            resp(false)
          }
        })
      })
      let resultado = await promessa
    }
    
      (async() => {
        await boleto();
        var vetor = localStorage.getItem('vetor');
        var linkvetor = localStorage.getItem('link');
        var vencimento = localStorage.getItem('boleto');
        module.exports = {
          chatid: idchat,
          link: linkvetor,
          venci:vencimento
         }

        if(vetor==="1"){
          return res.redirect("enviarboleto");
        }
        else{
          return res.redirect("boletonaoencontrado");
        }
      })();
  
  })


module.exports = router
