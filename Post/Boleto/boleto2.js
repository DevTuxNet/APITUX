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

router.get("/boleto2",cors(corsOptions),function boleto(req, res){
  const auth = require('../Autentica/auth2');
    var token= localStorage.getItem('token');
    var cpf = auth.cpfvalido;
    console.log(cpf)
    var idchat = auth.chatid;

    const headers = {
        "Accept":"application/json",
        "Authorization": "Bearer " + token 
      };

    var postData = {
      "busca": "cpf_cnpj",
      "termo_busca": cpf,
      "limit": "3",
      "apenas_pendente": "sim"
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
          localStorage.setItem('num_faturas', body.faturas.length);
          if (body.faturas.length===1){
            for (var i = 0; i < body.faturas.length; i++) {
              var boleto = body.faturas[0];
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
          }
        
          if (body.faturas.length===2){
            for (var i = 0; i < body.faturas.length; i++) {
              var boleto1 = body.faturas[0];
              var boletovencimento1 = boleto1.data_vencimento
              if(boletovencimento1===null || boletovencimento1==="undefined"){
                localStorage.setItem('boleto1', "0" ); 
              }else{
                localStorage.setItem('boleto1', boletovencimento1 );
              }
              var link1= boleto1.link
              if(link1===null || link1==="undefined"){
                localStorage.setItem('link1', "0" ); 
              }else{
                localStorage.setItem('link1', link1 );
              }
              var boleto2 = body.faturas[1];
              var boletovencimento2 = boleto2.data_vencimento
              if(boletovencimento2===null || boletovencimento2==="undefined"){
                localStorage.setItem('boleto2', "0" ); 
              }else{
                localStorage.setItem('boleto2', boletovencimento2 );
              }
              var link2=boleto2.link
              if(link2===null || link2==="undefined"){
                localStorage.setItem('link2', "0" ); 
              }else{
                localStorage.setItem('link2', link2 );
              }
            }
            localStorage.setItem('vetor', "1" );
            resp(true)
          }
          else{
            resp(false)
          }
        })
      })
      let resultado = await promessa
    }
    
      (async() => {
        await boleto();
        var num_boleto= localStorage.getItem('num_faturas');
        var linkvetor = localStorage.getItem('link');
        var vencimento = localStorage.getItem('boleto');
        var linkvetor1 = localStorage.getItem('link1');
        var vencimento1 = localStorage.getItem('boleto1');
        var linkvetor2 = localStorage.getItem('link2');
        var vencimento2 = localStorage.getItem('boleto2');
        if (num_boleto==="1"){
          var vetor = localStorage.getItem('vetor');
          module.exports = {
            chatid: idchat,
            link: linkvetor,
            venci:vencimento,
           }
           if(vetor==='1'){
            return res.redirect("enviarboleto2");
          }
          else{
            return res.redirect("boletonaoencontrado2");
            
          }
        }
        if(num_boleto==="2"){
          var vetor = localStorage.getItem('vetor');
          module.exports = {
            chatid: idchat,
            link1: linkvetor1,
            link2: linkvetor2,
            venci1:vencimento1,
            venci2:vencimento2
           }
           if(vetor==="1"){
            return res.redirect("enviarboleto2");
          }
          else{
            return res.redirect("boletonaoencontrado2");
          }
        }
        if(num_boleto>"2"){
          module.exports = {
            chatid: idchat
           }
          return res.redirect("variosboletos2");
        }
        else{
          module.exports = {
            chatid: idchat
           }
          return res.redirect("boletonaoencontrado2");
        }
      })();
  
  })


module.exports = router

