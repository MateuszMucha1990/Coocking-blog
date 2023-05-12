const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {port} = require('./config');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const {sessionKeySecret} = require('./config')



const app = express();

require('./server/models/database')

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));   
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret:sessionKeySecret,
    saveUninitialized:true,
    resave:true,
}));
app.use(flash());
app.use(fileUpload());

//set layouts
app.set('layout', './layouts/main');

//view engine
app.set('view engine', 'ejs')

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);





app.listen(port, () => console.log(`Serwer slucha na port: ${port}`));