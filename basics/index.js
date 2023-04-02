const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 7777;
const handle = require("express-handlebars");


app.engine('handlebars', handle.engine());
app.set('view engine', 'handlebars');
app.use( 
    express.urlencoded({
        extended: true, 
    }),
    
);

app.use(express.json());

app.use(express.static('public'));





const userRoutes = require("./users");
const hbs = handle.create({
    partialsDir:['views/partials']
});

/*const checkAuth = function(req, res, next) 
{

    req.authStatus = true;

    if(req.authStatus == true)
    {
        console.log("Logado");
        next();
    }
    else 
    {
        console.log("nao logado");
    }
}


app.use(checkAuth);
*/

//app.get('/usuarios/dev', (req, res) =>{
//    res.send("Hello World!");
//});

app.use('/', userRoutes);


const conn = mysql.createConnection({
    hist: 'localhost',
    user: 'root',
    password: '',
    database: 'meubanco',
});

conn.connect(function(err){

    if(err)
    {
        console.log("Not connected...");
    }

    console.log("connected!");

    app.listen(3000);

});








