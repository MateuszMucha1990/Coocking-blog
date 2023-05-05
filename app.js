const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {port} = require('./config')

const app = express();



//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));   
app.use(expressLayouts);

//set layouts
app.set('layout', './layouts/main');

//view engine
app.set('view engine', 'ejs')

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);





app.listen(port, () => console.log(`Serwer slucha na port: ${port}`));