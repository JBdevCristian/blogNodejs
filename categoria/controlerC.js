const express = require("express");
const router = express.Router();


router.get("/admin/categorias/novo", (req, res) => {
    res.render("admin/categorias/noticias")
});

router.get("/categorias/salvar", (req, res) => {
    var titulo = req.body.titulo;

    if (titulo != undefined) {

    } else {
        res.redirect("admin/categorias/noticias")
    }

});

module.exports = router;