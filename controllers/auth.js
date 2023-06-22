const jwt = require("jsonwebtoken")
const mysql=require("mysql2")
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"#Increaseby2.",
    database:"nationalexam"
})
exports.registerAdmin=(req,res)=>{
        const {names,username,password}=req.body
        
        con.connect(function(err){
            if(err) throw err;
            console.log("connected")
                con.query(`insert into admins (names,username,password) values('${names}','${username}','${password}')`,(err,result) => {
                    if (err) throw err
                    res.status(200).send("successfully registered admin")
                }
                    )
                  
            })
    ;
}
exports.login=(req,res)=>{
    const{username,password}=req.body
    con.query(`select *from admins where username='${username}' and password='${password}';`,(err,result)=>{
        if(err) throw err;
        else{
            const secretKey = 'your-secret-key';
            const token = jwt.sign({ username, password }, secretKey, {
              expiresIn: '24h'
            });
            res.status(200).send(token)
        }
    })
}


