const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const slugify = require("slugify");
const Article = require('./Article');
const adminAuth = require("../middleware/adminAuth")

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    });
});

router.post("/articles/save", (req, res)=> {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        console.log("Artigo Criado");
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req, res)=> {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                console.log("Artigos deletada com sucesso!")
                res.redirect("/admin/articles")
            });
        } else {
            res.redirect("/admin/articles")
        }

    } else {
        res.redirect("/admin/articles")
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    Article.findByPk(id).then(articles => {
        if(articles != undefined) {

            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {articles: articles,categories: categories}) 
            })

        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

router.post("/articles/update", (req, res)=> {
    var id = req.body.id;
    var body = req.body.body
    var title = req.body.title;
    var category = req.body.category;

    Article.update({title: title, body: body, categoryId: category,slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=> {
        console.log("Artigo editada!")
        res.redirect("/admin/articles")
    });
});

router.get("/articles/page/:num", (req, res)=> {
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 3,
        offset: offset
    }).then(articles => {
         
        var next;
        if(offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles

        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories})
        })
    });
});


module.exports = router;