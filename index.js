const express = require('express');
const app = express(); // EXP express
const bodyParser = require('body-parser'); //exportando body-parser
const connection = require("./database/database") //exportando banco de dados

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    }).catch((err) => {
        console.log(err)
    })


app.get("/", (req, res) => { //Rota principal
    res.render('index')

});

app.listen(8080, () => {
    console.log("Servidor está rodando")
})