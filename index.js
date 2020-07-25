const express = require("express");
const app = express();
const authhub = require("./Get/Auth/AuthHUB")
const authcliente = require("./Post/Autentica/auth")
const boasvindas = require("./Post/Mensagem/boasvindas")
const authcallback = require("./Get/Auth/Callback")
const boleto = require("./Post/Boleto/boleto")
const enviarboleto = require("./Post/Mensagem/enviarboleto")
var cors = require('cors')

var corsOptions = {
  origin: 'www.huggy.app',
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions))

app.use('/auth', authhub )
app.use('/auth', authcallback )

app.use('/cliente', authcliente )
app.use('/cliente', boasvindas )
app.use('/cliente', boleto )
app.use('/cliente', enviarboleto )


app.listen(8010, function(){
  console.log("rodando porta 8010");
});