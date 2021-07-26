const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const homeStartingContent =
  'We love JavaScript. Its a totally friendly language. All templating languages grow to be -complete. Just cut out the middle-man, and use JS!  EJS has a large community of active users, and the library is under active development. Were happy to answer your questions or give you help.Its easy to debug EJS errors: your errors are plain JavaScript exceptions, with template line-numbers included.';
const contactContent =
  'We all know how fast V8 and the other JavaScript runtimes have gotten. EJS caches the intermediate JS functions for fast execution.';
const aboutContent =
  "What is the E for? Embedded?Could be. How about Effective,Elegant,or just Easy ? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.";
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// global variable for posts
let posts = [
  {
    Title: 'day1',
    postBody:
      'We love JavaScript. Its a totally friendly language. All templating languages grow to be -complete. Just cut out the middle-man, and use JS! EJS has a large community of active users, and the library is under active development. Were happy to answer your questions or give you help.Its easy to debug EJS errors: your errors are plain JavaScript exceptions, with template line-numbers included.',
    date: new Date().toLocaleDateString('en-US'),
  },
];
//routes
app.get('/', (req, res) => {
  res.render('home', {
    StartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    about: aboutContent,
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    contact: contactContent,
  });
});

//compose post route
app.get('/compose', (req, res) => {
  res.render('compose');
});
app.post('/compose', (req, res) => {
  let post = {
    Title: req.body.Title,
    postBody: req.body.postBody,
    date: new Date().toLocaleDateString('en-US'),
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/post/:Title', (req, res) => {
  let postValue = _.lowerCase(req.params.Title);
  posts.forEach((post) => {
    let storedValue = _.lowerCase(post.Title);
    if (storedValue === postValue) {
      res.render('post', {
        Title: post.Title,
        date: post.date,
        postBody: post.postBody,
      });
    }
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
