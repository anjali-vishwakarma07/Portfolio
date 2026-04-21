const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

db.connect((err)=>{
    if(err){
        console.log(`Error while connecting ${process.env.db_name} database`);
    }

    console.log(`Connected to ${process.env.db_name} database`);
    
});

module.exports = db;