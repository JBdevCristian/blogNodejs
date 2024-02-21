const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")

const categoriesController = require("./categories/categoriesControler");
const articlesController = require("./articles/articlesControler");

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

app.use("/categoriasPrefixo", categoriesController);
app.use("/", articlesController)

app.get("/", (req, res) =>{
    res.render("index");
});

app.listen(8080, () => {
    console.log("o servidor está rodando!");
})