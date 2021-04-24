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
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New blog',
        snippet: 'about my new blog',
        body: 'more about my blog'
    });

    blog.save()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);
        })
})



app.get('/', (req, res) => {
    const blogs = [
        { title: "Eric Developer", snippet: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,' },
        { title: 'Junior Developer', snippet: ' sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia' },
        { title: 'Senior Developer', snippet: ' cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere' }
    ];
    res.render('index', { title: 'Home page', blogs })
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


