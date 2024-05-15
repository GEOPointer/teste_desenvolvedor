import mysql from "mysql";
 export const database = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:".topos123.",
    database:"equipments",
    port: 3306,
    insecureAuth : true
});