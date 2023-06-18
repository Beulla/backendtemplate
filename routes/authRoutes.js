const {register,login,page}=require("../controllers/auth")
const express=require("express")
const authenticateJWT=require("../middlewares/autheticatejwt")
const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/protected",authenticateJWT,page)
module.exports=router
