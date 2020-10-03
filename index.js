const express = require("express");
const app = express();
const authhub = require("./Get/Auth/AuthHUB")
const atualiza_token = require("./Get/Auth/atualiza_token")
const authcliente = require("./Post/Autentica/auth")
const authcliente2 = require("./Post/Autentica/auth2")
const authcallback = require("./Get/Auth/Callback")
const boleto = require("./Post/Boleto/boleto")
const boleto2 = require("./Post/Boleto/boleto2")
const enviarboleto = require("./Post/Mensagem/enviarboleto")
const enviarboleto2 = require("./Post/Mensagem/enviarboleto2")
const variosboletos = require("./Post/Mensagem/variosboletos")
const variosboletos2 = require("./Post/Mensagem/variosboletos2")
const errocpf = require("./Post/Mensagem/cpfinvalido")
const errocpf2 = require("./Post/Mensagem/cpfinvalido2")
const boletonaoencontrado = require("./Post/Mensagem/boletonaoencontrado")
const boletonaoencontrado2 = require("./Post/Mensagem/boletonaoencontrado2")
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
app.use('/cliente', authcliente2 )
app.use('/cliente', variosboletos )
app.use('/cliente', variosboletos2 )
app.use('/cliente', boleto )
app.use('/cliente', boleto2 )
app.use('/cliente', enviarboleto )
app.use('/cliente', enviarboleto2 )
app.use('/cliente', errocpf )
app.use('/cliente', errocpf2 )
app.use('/cliente', boletonaoencontrado )
app.use('/cliente', boletonaoencontrado2 )

app.listen(8010, function(){
  console.log("rodando porta 8010");
});
