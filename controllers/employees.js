const User=require("../model/user")
const jwt = require("jsonwebtoken")
const Joi=require("joi")
const bcrypt=require("bcrypt")
const mysql=require("mysql2")
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"#Increaseby2.",
    database:"nationalexam"
})
exports.registerEmployee=(req,res)=>{
        const {firstname,lastname,nationalId,phoneNumber,email,department,position,laptopManufacture,model,serialNumber}=req.body
        
        con.connect(function(err){
            if(err) throw err;
            console.log("connected")
                con.query(`insert into employeesLaptop (Firstname,Lastname,nationalId,phoneNumber,email,department,position,laptopManufacture,model,serialNumber) values ('${firstname}','${lastname}','${nationalId}','${phoneNumber}','${email}','${department}','${position}','${laptopManufacture}','${model}','${serialNumber}');`,(err,result) => {
                    if (err) throw err
                    res.status(200).send("successfully registered employee")
                }
                    )
                  
            })
    ;
}
exports.listEmployees=(req,res)=>{
    con.query("select * from employeesLaptop;",(err,result)=>{
        if(err) throw err;
        else{
            console.log(result)
            res.status(200).send(result)
        }
    })
}


