const http=require('http');
const express=require('express');
const app=express();
const session=require('express-session');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const validator=require('express-validator');
const passport=require('passport');
const path=require('path');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const mongoose=require('mongoose');
const ejs=require('ejs');


module.exports=class Application{
    constructor(){
        this.serverSetup();
        this.setMongoConnection();
        this.configExpress();
        this.setRouters();
    }

    serverSetup(){
        const server=http.createServer(app);
        server.listen(process.env.PORT || 3000)
        console.log(`server is runing on port ${server.address().port}`)
    }

    setMongoConnection(){
        mongoose.Promise=global.Promise;
        mongoose.connect('mongodb://localhost/personal',{useNewUrlParser:true});
    }

    
    configExpress(){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.set('views',path.resolve('./resources/views'));
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(validator());
        app.use(session({
            secret:'personal',
            resave:true,
            saveUninitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
        }))
        app.use(flash());

        app.use(cookieParser('personal'))
    }
    

    setRouters(){
        app.use(require('./routes'));
    }

}