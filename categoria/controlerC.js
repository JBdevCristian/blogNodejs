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

//Localizando pagina de editar pelo ID
router.get("/admin/categorias/editar/:id", (req, res) => {

    var id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/admin/categorias")
    }

    Categoria.findByPk(id).then(categoria => {
        if(categoria != undefined) {

            res.render("admin/categorias/editar", {categoria: categoria})

        }else {
            res.redirect("/admin/categorias");
        }
    })

});

module.exports = router;