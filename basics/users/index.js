const express = require("express");
const router = express.Router();
const path = require("path");
const basePath = path.join(__dirname, 'templates');

router.get('/:id', (req, res) =>{

    const idUser = req.params.id;

    if (idUser == 1)
    {
        res.send("Admin");
    }
    else
    {
        res.send("Normal user");
    }


});

router.get("/forms/form", (req, res) => {
    res.sendFile(`${basePath}/form.html`);
});

router.post("/form/save", (req, res) =>{

    console.log(req.body);

});

router.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`);
});

module.exports = router;


