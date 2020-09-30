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
    //
    var cpf = req.body.cpf;
    var idchat = req.body.idchat;
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
    async function auth(){ 
      let promessa = new Promise((resp,rej)=>{
        request (options, function(err, res, body, req) {
          console.log(body.clientes.length)
          if (body.clientes.length===1){
            localStorage.setItem('validacpf', "1" );
            resp(true)
          }else{
            localStorage.setItem('validacpf', "0" );
            resp(false)
          }
        })
      })
      let resultado = await promessa
     // console.log(resultado)
    }
  
    (async() => {
      await auth();
      
    var validacpf= localStorage.getItem('validacpf');
     
     if (validacpf==='1'){
      module.exports = {
        chatid: idchat,
        cpfvalido: cpf
       }
      return res.redirect("boleto");
    }else{
      module.exports = {
        chatid: idchat
       }
      return res.redirect("cpfinvalido");
    }
    })();

  })


module.exports = router
