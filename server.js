import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import config from './config';
import apiRouter from './api';
import serverRender from './serverRender'; 
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



server.get(['/', '/contest/:contestId'], (req, res) => {
    // renders <App init={res.data.contests} /> component as a string
    // destructure returned obj from serverRender
    // initMarkup displayed on page
    // initData store data to window
    
    // localhost:8080 request goes to here
    // serverRender before React has rendered
    //console.log('request',req);
    serverRender(req.params.contestId)
    .then(({initData, initMarkup}) => {
        res.render('index', {
            initData,
            initMarkup
        })
    })
    .catch(console.error)
    
});

server.use(express.static('public'))

server.use('/api', apiRouter)

// server.get('/contact.html', (req, res) => {
//     //res.send('Contact us!');
//     fs.readFile('./contact.html', (error, data) => {
//         res.send(data.toString())
//     })
// })

server.listen(config.port, config.host, () => {
    console.log('Express is listening on: ', config.port);
    console.log('Express is listening on: ', config.host);
});

