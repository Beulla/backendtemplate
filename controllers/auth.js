const User=require("../model/user")
const jwt = require("jsonwebtoken")
const Joi=require("joi")
const bcrypt=require("bcrypt")
const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(120).required()
  });
const schema=Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(120).required()
})
exports.register=async(req,res)=>{
    const {username,password,email}=req.body
    const validationResults=userSchema.validate(req.body)
    
        if (validationResults.error) {
          console.error('Validation error:', error.details);
        } else {
            let user=await User.findOne({email:email})
            if(user){
                res.status(200).send("user already exists")
            }
            else{
                const salt=bcrypt.genSaltSync(10)
                const hashedPassword=bcrypt.hashSync(password,salt)
                const newUser=new User({
                    username,
                    email,
                    password:hashedPassword
                })
                await newUser.save().then(()=>{
                    res.status(200).send("account created successfully")
                })
                .catch((err)=>{
                    res.send(err.message)
                })
            }
        }
    ;
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    const validation=schema.validate(req.body)
    
    if(validation.error){
        res.send("validation error: ",error.details)
    }
    else{
        
        let user=await User.findOne({email:email})
        
        if(user){
            const verifyPassword=bcrypt.compareSync(password,user.password)
            if(verifyPassword){
                const secret="this secret key"
                const payload = { email:email, username: user.username };
                const token = jwt.sign(payload, secret, { expiresIn: '24h' });
                res.status(200).send(token)
            }
            else{
                res.send("invalid email or password").status(403)
            }
        }
        else{
            res.send("user doesn't exist")
        }
    }
}
exports.page=(req,res)=>{
    res.send("welcome here")
}


