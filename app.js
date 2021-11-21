require('dotenv').config();
const express = require ('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');
const multer  = require('multer');
const path = require('path');
const connectEnsureLogin = require('connect-ensure-login');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MatiasVarela"
  }
});

const upload = multer({ storage: storage });


/*  PASSPORT SETUP  ----------------------------------------------------------*/

const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const UserDetail = new mongoose.Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');


const expressSession = require('express-session')({
  secret: process.env.expressSession_secret,
  resave: false,
  saveUninitialized: false
});



/* PASSPORT LOCAL AUTHENTICATION -----------------------------------------*/

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// CREATES A NEW ADMIN
// UserDetails.register({username:'<ADMINUSERNAME>', active: false}, '<ADMINPASSWORD>');
// YOU DON'T WANT TO SHOW THIS, DELETE OR CHANGE PARAMETERS, DO NOT LET THE USERNAME OR PASSWORD


// --------------------------------------------------------------------------

// MongoDB Connection
mongoose.connect(process.env.mongodb_database);

// Posts Schema
const postSchema = {
  img: String,
  title: String,
  description: String,
  body: String,
  date: String,
  nLink: String
}
const Post = mongoose.model('post', postSchema);

// Product Schema
const productSchema = {
  img: String,
  title: String,
  description: String,
  body: String,
  flashcookieLink: String
}
const Product = mongoose.model('product', productSchema);

// Items Schema for portfolio
const itemSchema = {
  img: String
};

const Item = mongoose.model('item', itemSchema);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/about', function(req, res){
  res.render('about', {active:"about", roller:"none"});
});

app.get('/contact', function(req, res){
  res.render('contact', {active:"contact", roller:"none"});
});

app.get('/nAdmin', connectEnsureLogin.ensureLoggedIn(), function(req,res){
    res.render('nAdmin', {active:"nAdmin", roller:"admin-dash"});
})


app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login?info=' + _.kebabCase(info));
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/nAdmin');
    });

  })(req, res, next);
});

app.get('/login',
  (req, res) => res.render('login')
);


// Blog and posts -------------------------------------------------------------

let posts = []

app.get('/nAdmin/nNewPost', connectEnsureLogin.ensureLoggedIn(), function(req,res){
    res.render('compose', {active:"nCompose", roller:"admin-dash", edit:"blog"});
})

let today = new Date();
let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
let postDate = today.toLocaleDateString('en-GB', options);

app.post('/nAdmin/nNewPost', upload.single('image'), function(req,res){
  const post = new Post({
    img: req.file.path,
    title: req.body.postTitle,
    description: req.body.postPreview,
    body: req.body.postBody,
    date: postDate,
    nLink: _.kebabCase(req.body.postTitle)
  });

  post.save();
  res.redirect('/blog');
});

app.get('/blog', function(req, res){
  Post.find({}, function(err,foundPosts){
    if (foundPosts.length == 0){
      res.render('blog', {active:"blog", posts:posts, roller:"none"});
    }else{
      if (!err){
        res.render('blog', {active:"blog", posts:foundPosts, roller:"none"});
      }
    }
  });
});

app.get('/blog/:postURL', function(req, res){
  Post.findOne({ nLink: _.kebabCase(req.params.postURL)}, function(err, foundPost){
    if(!err){
      res.render('post', {img:foundPost.img, title:foundPost.title, body:foundPost.body, active:"post", roller:"admin-dash", date:foundPost.date})
    } else {
      res.redirect('/blog')
    }
  })
})

// Deleting posts from blog-

app.get('/nAdmin/nDeletePost', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  Post.find({}, function(err,foundPosts){
    if(!err){
      res.render('remove', {active:"remove-post", posts:foundPosts, roller:'admin-dash'});
    }else{
      console.log(err);
    }
  });
});

app.post('/nAdmin/nDeletePost', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  const checkPostId = req.body.checkbox;

  Post.findByIdAndRemove(checkPostId, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/nAdmin/nDeletePost')
    }
  })
});


//----------------------------------Store and products-----------------------------

let products = [];

app.get('/nAdmin/nNewProduct', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  res.render('compose', {active:"nCompose", roller:"admin-dash", edit:"store"})
});

app.post('/nAdmin/nNewProduct', upload.single('image'), function(req,res){

  const product = new Product ({
    img: req.file.path,
    title: req.body.postTitle,
    description: req.body.postPreview,
    body: req.body.postBody,
    flashcookieLink: req.body.flashLink
  });

  product.save();
  res.redirect('/shop');
})


app.get('/shop', function(req, res){
  Product.find({}, function(err,foundProducts){
    if (foundProducts.length == 0){
      res.render('shop', {active:"shop", products:products, roller:"none"});
    }else{
      if (!err){
        res.render('shop', {active:"shop", products:foundProducts, roller:"none"});
      }
    }
  })
});



// Deleting products from database--.-.-.-...-...-.-.-.-.-.--.-.-.-..

app.get('/nAdmin/nDeleteProduct', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  Product.find({}, function(err,foundProducts){
    if(!err){
      res.render('remove', {active:"remove-product", products:foundProducts, roller:'admin-dash'});
    }else{
      console.log(err);
    }
  });
});

app.post('/nAdmin/nDeleteProduct', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  const checkProductId = req.body.checkbox;

  Product.findByIdAndRemove(checkProductId, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/nAdmin/nDeleteProduct')
    }
  })
});


//---------Portfolio-----------------------------------------------------------

let items = [];

app.get('/nAdmin/nNewItem', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  res.render('compose', {active:"nCompose", roller:"admin-dash", edit:"portfolio"})
});

app.post('/nAdmin/nNewItem', upload.single('image'), function(req,res){

  const item = new Item({
    img: req.file.path
  });

  item.save();
  res.redirect('/portfolio');
})

app.get('/portfolio', function(req, res){
  Item.find({}, function(err, foundItems){
    if (foundItems == 0){
      res.render('portfolio', {active:"portfolio", roller:"none", items:items})
    } else {
      if (!err){
        res.render('portfolio', {active:"portfolio", roller:"none", items:foundItems});
      }
    }
  })
});

app.get('/nAdmin/nDeleteItem', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  Item.find({}, function(err,foundItems){
    if(!err){
      res.render('remove', {active:"remove-item", items:foundItems, roller:'admin-dash'});
    }else{
      console.log(err);
    }
  });
});

app.post('/nAdmin/nDeleteItem', connectEnsureLogin.ensureLoggedIn(), function(req,res){
  const checkItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkItemId, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/nAdmin/nDeleteItem')
    }
  })
});


app.listen(process.env.PORT || port,function(){
  console.log('Server is running, like Forrest but faster')
});
