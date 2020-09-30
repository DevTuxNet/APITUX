const express = require("express");
const app = express();
const authhub = require("./Get/Auth/AuthHUB")
const atualiza_token = require("./Get/Auth/atualiza_token")
const authcliente = require("./Post/Autentica/auth")
const authcallback = require("./Get/Auth/Callback")
const boleto = require("./Post/Boleto/boleto")
const enviarboleto = require("./Post/Mensagem/enviarboleto")
const variosboletos = require("./Post/Mensagem/variosboletos")
const errocpf = require("./Post/Mensagem/cpfinvalido")
const boletonaoencontrado = require("./Post/Mensagem/boletonaoencontrado")
var cors = require('cors')

var corsOptions = {
  origin: 'www.huggy.app',
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions))

app.use('/auth', authhub )
app.use('/auth', authcallback )
app.use('/auth', atualiza_token )

app.use('/cliente', authcliente )
app.use('/cliente', variosboletos )
app.use('/cliente', boleto )
app.use('/cliente', enviarboleto )
app.use('/cliente', errocpf )
app.use('/cliente', boletonaoencontrado )

app.listen(8010, function(){
  console.log("rodando porta 8010");
});