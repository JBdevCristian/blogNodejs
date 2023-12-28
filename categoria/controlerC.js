const express = require("express");
const router = express.Router();
const Categoria = require("./Categorias"); //importando o model
const slugify = require("slugify"); //adicionando o slug (Abreviação)


router.get("/admin/categorias/novo", (req, res) => {
    res.render("admin/categorias/noticias")
});

router.post("/categoria/salvar", (req, res) => { //criando rota para salvar no banco de dados
   let titulo = req.body.titulo;

    if (titulo != null) {

        Categoria.create({ //criando categoria com base no model
            titulo: titulo,
            slug: slugify(titulo)
        }).then(() => {
            res.redirect("/")
        });
        
    } else {
        res.redirect("/admin/categorias/novo")
    }

});

module.exports = router;