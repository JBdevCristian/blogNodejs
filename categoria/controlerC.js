const express = require("express");
const router = express.Router();
const Categoria = require("./Categorias"); //importando o model
const slugify = require("slugify"); //adicionando o slug (Abreviação)


router.get("/admin/categorias/new", (req, res) => {
    res.render("admin/categorias/noticias")
});


router.get("/admin/categorias", (req, res) => {

    Categoria.findAll().then(categorias => {
        res.render("admin/categorias/index", {categorias: categorias})
    })

    
})



module.exports = router;