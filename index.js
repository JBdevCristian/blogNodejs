const express = require('express');
const app = express(); // EXP express
const bodyParser = require('body-parser'); //exportando body-parser
const connection = require("./database/database") //exportando banco de dados

const Artigos = require("./artigo/Artigos");
const Categorias = require("./categoria/Categorias")

//controller
const categoriesController = require("./categoria/controlerC") //importando e definindo controles de outras rotas
const categoriesArticles = require("./artigo/controlerA") //importando e definindo controles de outras rotas - Artigos

app.use("/", categoriesController) //dizendo para index que quero utilizar o codigo do controler criado
app.use("/", categoriesArticles) 

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