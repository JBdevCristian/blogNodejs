const express = require("express");
const app = express(); // EXP express
const bodyParser = require("body-parser"); //exportando body-parser
const connection = require("./database/database"); //exportando banco de dados
const slugify = require("slugify"); //adicionando o slug (Abreviação)

const Artigos = require("./artigo/Artigos");
const Categorias = require("./categoria/Categorias");

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
app.use(bodyParser.urlencoded({extended: false})) //Decodificar o form
app.use(bodyParser.json()); //Ler dados de formulario via JSON 

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    }).catch((err) => {
        console.log(err)
    })

app.use("/", categoriesController);



app.get("/", (req, res) => { //Rota principal
    res.render('index')

});

//Salvando dados de categoria
app.post("/categoria/salvar", (req, res) => { //criando rota para salvar no banco de dados
    let titulo = req.body.titulo;
 
     if (titulo != null) {
 
        Categorias.create({ //criando categoria com base no model
             title: titulo,
             slug: slugify(titulo)
         }).then(() => {
             res.redirect("/")
         });
         
     } else {
         res.redirect("/admin/categorias/new")
     }
 
 });

 //Deletando informação na tabela categorias
 app.post("/categorias/delete", (req, res) => {
    var id = req.body.id; //pegando informação do forms

    if(id != undefined) {
        if(!isNaN(id)) { //se não for um numero
            Categorias.destroy({ //deletando item da tabela
                where: { //localizando no banco
                    id: id //Pegando ID
                }
            }).then(() => {
                res.redirect("/admin/categorias");
            });
        }else { //Se não for um numero
            res.redirect("/admin/categorias");
        }

    }else { //Se não houver nenhum valor
        res.redirect("/admin/categorias");
    }
});

app.listen(8080, () => {
    console.log("Servidor está rodando")
})