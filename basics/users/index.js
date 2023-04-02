const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const basePath = path.join(__dirname, 'templates');
const handle = require("express-handlebars");
app.engine('handlebars', handle.engine());
app.set('view engine', 'handlebars');
const mysql = require("mysql");


const conn = mysql.createConnection({
    hist: 'localhost',
    user: 'root',
    password: '',
    database: 'meubanco',
});

router.get("/", (req, res) => {

    const user ={
        name: "Charles",
        email: "Charles@tetsde.com",
    }

    const auth = true;

    const carrinho = ['tv', 'pc', 'books'];

    res.render('home', {user: user, auth, carrinho});
});


router.post('/createUser', (req, res, next) => {

    const name = req.body.nome;

    const sql = `INSERT INTO teste (??) VALUES (?)`; //Prepare to sql injection
    const data = ['nome', name]; //prepare 2

    conn.query(sql, data, function(err){ //prepare 3 with data
        if (err)
        {
            console.log("error to insert");
        }
        else{
            console.log('aaaaaaaaaaaaaa')
        }
        res.redirect('/usuarios');
    });
});

router.get('/usuarios', (req, res) => {

    const sql = "SELECT * FROM teste";

    conn.query(sql, function(err, data){

        if(err)
        {
            console.log(err);
            return;
        }
        const users = data;

        res.render('users', {users});



    });

});


router.get('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    const sql = `SELECT * FROM teste WHERE id = ${id}`;

    conn.query(sql, function(err, data){
        if (err)
        {
            console.log('Erro ao resgatar o dado: ' + err);
            return
        }

        const userSelected = data;

        res.render('user', {userSelected});
    })

    conn.query(sql, function(err, data){

        if(err)
        {
            console.log(err);
            return;
        }
        const users = data;

        res.render('users', {users});



    });

});


router.get('/usuarios/edit/:id', (req, res) => 
{
    const id = req.params.id;

    const sql = `SELECT * FROM teste WHERE id = ${id}`;

    conn.query(sql, function(err, data){
        if(err)
        {
            console.log(err);
            return;
        }

        const userSelected = data;

        res.render('editar', {userSelected});
    })
})

router.post('/usuarios/updateUserWithId', (req, res) =>{
    const id = req.body.id;
    const name = req.body.nome;

    const sql = `UPDATE teste set nome = '${name}' where id = '${id}'`;

    conn.query(sql, function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        
        res.redirect('/usuarios');

    })
})

router.post('/usuarios/remove/:id', (req, res) => {
    const id = req.params.id;

    const sql = `delete from teste where id = ${id}`;

    conn.query(sql, function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        res.redirect('/usuarios');
    })
})



module.exports = router;


