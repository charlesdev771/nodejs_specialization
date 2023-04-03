const express = require("express");
const app = express();
const mysql = require("mysql");
const ehb = require("express-handlebars");
const port = 3000;
const {Sequelize} = require("sequelize");
const sequelize = new Sequelize('banco2', 'root', '',{
    host: '127.0.0.1',
    dialect: 'mysql',
});



module.exports = sequelize;