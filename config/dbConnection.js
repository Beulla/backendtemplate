const mysql=require("mysql2")

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"#Increaseby2."
})
con.connect(function(err){
    if(err) throw err;
    console.log("connected")
})
module.exports=con