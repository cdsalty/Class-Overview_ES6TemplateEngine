const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine');
const app = express();
app.engine('html', templateEngine);
app.set('views', 'templates');
app.set('view engine', 'html');

const cats = [
  {
    id: 'abys',
    name: 'absynian',
  },
  {
    id: 'abys1',
    name: 'absynian one',
  },
];

app.get('/', (req, res) => {
  res.render('homepage', {
    partials: {
      header: 'partials/header',
    },
  });
});

app.get('/cats', (req, res) => {
  res.render('catlist', {
    locals: {
      cats,
    },
    partials: {
      header: 'partials/header',
    },
  });
});

app.get('/cats/:catId', (req, res) => {
  const catId = req.params['catId'];
  const cat = cats.find((c) => c.id == catId);
  res.render('catinfo', {
    locals: {
      cat,
    },
  });
});

const server = http.createServer(app);
server.listen(3000, '127.0.0.1', () => {
  console.log('Server started');
});
