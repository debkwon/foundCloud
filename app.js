const express = require('express');
const app = express();
const path=require('path')
const morgan = require('morgan');
const nunjucks = require('nunjucks');
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

const searchRouter = require('./server/search');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', searchRouter);

if (!module.parent){
  app.listen(port, () => {
    console.log('...listening on', port)
  })
}

module.exports = app;
