const express = require('express');
const bodyParser = require('body-parser');
var _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postArray=[];

app.get('/compose', function(req, res){
    res.render('compose.ejs',{post: postArray});
})

app.get("/", function(req, res){
    res.render("home.ejs", {post: postArray});
});

app.get("/post/:postTitle", function(req, res){
    let postTitle = req.params.postTitle;
    postTitle= _.lowerCase(postTitle);
    postArray.forEach(function(post){
        if(_.lowerCase(post.title) === postTitle){
            res.render("post.ejs", {post: post});
        }
    });
});

app.get("/about", function(req, res){
    res.render("about.ejs");
});

app.get("/contact", function(req, res){
    res.render("contact.ejs");
});

app.post('/compose', function(req, res){
    let post={
        title: req.body.postTitle,
        content: req.body.postContent
    };
    postArray.push(post);
    res.redirect('/');
});

app.post('/about', function(req, res){
    res.redirect('/about');
});

app.post('/contact', function(req, res){
    res.redirect('/contact');
});

app.post("/", function(req, res){
    res.redirect('/');
});

app.listen(PORT, function(){
    console.log("Server started on port 3000");
});
