const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const { Cookie, Session } = require('express-session');

// For flash comment
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        // Debug to show errors in the terminal
        debug:true,
        outputStyle:'extended',
        // prefix is basically the place where this middleware will look for css file
        // It will tell the sass middleware that any request file will always be prefixed with <prefix> and this prefix should be ignored.
        prefix:'/css'
    }
));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// below command is use to tell the browser that if '/uploads' encounters use that path mentioned below
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);


// extract style and scripts from sub pages into the layouts\
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');
// Mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode 
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:
    {
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development',
        autoRemove:'disabled'
    }) 
    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// Use it after the session as it store the session information
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        // console.log('Error',err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});