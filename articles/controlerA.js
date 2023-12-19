const express = require("express");
const router = express.Router();

//poderia utilizar o nome APP ou qualquer outro mas para diferenciar coloquei router para organizar o controler de categories

router.get("/articles", (req, res) => {
    res.send("Rota de artigos")
});


router.get("/adm/articles", (req, res) => {
    res.send("Testando nova rota")
});


module.exports = router;