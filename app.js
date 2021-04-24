const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://erfanfulldev:test123@node.jcbmo.mongodb.net/Node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000, 'localhost', () => {
            console.log('listening to  [ localhost:3000 ]');
        })

    }).catch(err => console.log(err.message));

app.set('view engine', 'ejs');
// app.set('views', 'myviews')




app.use(express.static('public'))


app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 200
    }
}));


// mongoose and mongo sandbox routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.render('index', { title: 'Home page', blogs: result })
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About us' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Blog creating' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})


