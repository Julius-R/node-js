const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connecting to database
mongoose.connect('mongodb://localhost:/nodekb');
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to mongoDb');
})

db.on('error', (err) =>{
    console.log('error');
})

// init app
const app = express();

//Add models
let Article = require('./models/article');

///load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if(err) {
            console.log('error')
        } else{
            res.render('index', {
                title: 'Knowledgebase',
                articles: articles
            });
        }   
    });
})

// get single article
app.get('/article/:id', (req, res) =>{
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article:article
        });
    });
})

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
})



//submit post route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

// edit article
app.get('/articles/edit/:id', (req, res) =>{
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
})

//edit post route
app.post('/articles/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}


    Article.update(query, article,(err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

//start server
app.listen(3000, () => {
    console.log('server started on port: 3000');
})