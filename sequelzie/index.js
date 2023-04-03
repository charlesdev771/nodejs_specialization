const express = require("express");
const app = express();
const mysql = require("mysql");
const ehb = require("express-handlebars");
const port = 3000;
const {Sequelize} = require("sequelize");
const conn = require('./db/conn');
const User = require('./models/User');
app.engine('handlebars', ehb.engine());
app.set('view engine', 'handlebars');
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(express.static('public'));




/*
const conn = mysql.createConnection({
    host: 'localhost',
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

*/
app.get("/", async (req, res, next) =>{

    const users = await User.findAll({raw: true}); 
    res.render("home", {users: users});


});

app.get("/viewDetail/:id", async (req, res, next) =>{

    const id = req.params.id;
    const user = await User.findOne({raw: true, where: {id: id}}); 
    res.render("user", {user});


});

app.post('/save', async (req, res, next) =>{

    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsletter = req.body.newsletter;

    await User.create({name, occupation, newsletter});

    res.redirect('/');
});

app.post('/delete/:id', async(req, res, next) =>{
    id = req.params.id;

    await User.destroy({where: {id: id}});

    res.redirect('/');
})

const sequelize = new Sequelize('banco2', 'root', '',{
    host: '127.0.0.1',
    dialect: 'mysql',
});



conn
    .sync()
    .then(()=> {
        app.listen(port);
    })
    .catch((err) => console.log(err));

