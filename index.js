const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in db
app.use(session({
    name: 'Optum',
    // TODO change the secret before deployment
    secret: 'Meow',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*15)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
});
