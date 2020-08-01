import config from './config';
import express from 'express';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path'; 
//import fs from 'fs';

const server = express();

// sass compiled by node
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}))
// server renders front-end js components
// by default looks in ./views/*.ejs - templates
server.set('view engine', 'ejs')

server.get('/', (req, res) => {
    //res.send('Hello!');
    res.render('index')
})

server.use(express.static('public'))

server.use('/api', apiRouter)

// server.get('/contact.html', (req, res) => {
//     //res.send('Contact us!');
//     fs.readFile('./contact.html', (error, data) => {
//         res.send(data.toString())
//     })
// })

server.listen(config.port, () => {
    console.log('Express is listening on: ', config.port);
});

