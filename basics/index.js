const express = require("express");

const app = express();
const port = 7777;
const path = require("path");
const basePath = path.join(__dirname, 'templates');
app.use( 
    express.urlencoded({
        extended: true, 
    }),
    
);

app.use(express.json());

app.use(express.static('public'));



const userRoutes = require("./users");

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

app.use('/users', userRoutes);



app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
  });


app.listen(port, ()=>{
    console.log("aa");
});