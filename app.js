const express = require('express');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'myviews')

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


app.listen(3000, 'localhost', () => {
    console.log('listening to  [ localhost:3000]');
})