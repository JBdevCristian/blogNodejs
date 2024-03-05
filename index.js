const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//Associando Controllers - Assim que criar um controller sempre adicionalo no index principal pois por ele que todo o projeto é carregado
const categoriesController = require("./categories/categoriesControler");
const articlesController = require("./articles/articlesControler");
const UserController = require("./user/userControler") 


//Associando a criação do banco de dados no arquivo principal.
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User")

//Redis - para evitar que seja salvo no proprio servidor


//Sessões
app.use(session({
    secret: "qualquercoisa", cookie: {maxAge: 30000}
}));


//view engine
app.set("view engine", "ejs");

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco")
    }).catch((error) => {
        console.log(error)
    })


    /*Sempre colocar o session a baixo do database
    app.get("/session", (req, res) => {
        req.session.treinamento = "formação node.js"
        req.session.ano = 2019
        req.session.email = "teste@gmail.com"
        req.session.user = {
            username: "victorlima",
            email: "email@gmail.com",
            id: 10
        }
        res.send("Sessão Geada!")
    });
    
    app.get("/leitura", (req, res) => {
        res.json({
            treinamento:  req.session.treinamento,
            ano: req.session.ano,
            email: req.session.email,
            user: req.session.user
        })
    });*/

//(Sempre deixar a baixo do Body Parser)Indicando para o arquivo principal para utilizar o Controller para as rotas funcionarem
app.use("/", categoriesController);
app.use("/", articlesController)
app.use("/", UserController)



app.get("/", (req, res) =>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 3
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
    
});

app.get("/:slug", (req, res)=> {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("articles", {article: article, categories: categories});
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    });
});



app.get("/category/:slug", (req, res)=> {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
});





app.listen(8080, () => {
    console.log("o servidor está rodando!");
})