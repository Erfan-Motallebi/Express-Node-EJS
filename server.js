const http = require('http');
const { existsSync, readFile } = require('fs')
const _ = require('lodash');
// console.log(http);

// creating a server

const server = http.createServer((req, res) => {

    // lodash
    // const num = _.random(0, 50);
    // console.log(num);


    // const greet = _.once(() => {
    //     console.log('Hello but Once. !');
    // })

    // greet();
    // greet();

    res.setHeader('Content-type', 'text/html');
    let path = "./views/";
    switch (req.url) {
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }




    if (!existsSync(path)) {
        console.log('File not found!');
    } else {
        readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.write(data)
                res.end()
            }
        })
    }
})

server.listen(5000, 'localhost', () => {
    console.log("listening to a port : 5000");
})