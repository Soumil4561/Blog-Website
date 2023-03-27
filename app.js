const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postTitle = [];
let postContent = [];

app.get('/compose', function(req, res){
    res.render('compose.ejs',{postTitle: postTitle, postContent: postContent});
})

app.get("/", function(req, res){
    res.render("home.ejs", {postTitle: postTitle, postContent: postContent});
});

app.get("/about", function(req, res){
    res.render("about.ejs");
});

app.get("/contact", function(req, res){
    res.render("contact.ejs");
});


app.get("/post", function(req, res){
    res.render("post.ejs");
});

app.post('/compose', function(req, res){
    postTitle.push(req.body.postTitle);
    postContent.push(req.body.postContent);
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
