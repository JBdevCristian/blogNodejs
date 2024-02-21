const express = require('express');
const router = express.Router();

router.get("/artigos", (req, res) => {
    res.send("Rota de artigos")
});

router.get("/admin/artigos/new", (req, res) => {
    res.send("Rota para criar uma novo artigo")
});


module.exports = router;