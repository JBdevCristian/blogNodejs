const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());


app.get("/", (req, res) => { //Rota principal
    res.render('index')

});

app.listen(8080, () => {
    console.log("Servidor está rodando")
})