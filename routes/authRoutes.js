const {registerAdmin,login}=require("../controllers/auth")
const express=require("express")
const authenticateJWT=require("../middlewares/autheticatejwt")
const router=express.Router()

router.post("/register",registerAdmin)
router.post("/login",login)

module.exports=router
