const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');

module.exports = function(){

  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(express.static('./app'));
  app.use(express.static('./node_modules'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  load('route', {cwd: 'app'})
    .then('database')
    .into(app);

  return app
}