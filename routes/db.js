const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

conexion.connect((error)=>{
    if (!error) {
        console.log("conectado")
    } else {
        console.log("erro de coneccion")
    }
})

module.exports = conexion;