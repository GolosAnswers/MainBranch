const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const proxy = require('http-proxy-middleware');
const express = require('express');

// Serve up public/ftp folder
const app = express();

// Create server
const apiProxy = proxy('/api', { target: 'http://ec2-34-216-27-21.us-west-2.compute.amazonaws.com:8000' });
app.use(apiProxy);

app.use(express.static('dist'));

const port = 3000;
app.listen(3000);

// Listen
console.log('server listening port', port);
