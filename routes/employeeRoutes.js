const {registerEmployee,listEmployees}=require("../controllers/employees")
const express=require("express")
const authenticateJWT=require("../middlewares/autheticatejwt")
const router=express.Router()

router.post("/register",registerEmployee)
router.get("/list",listEmployees)
module.exports=router
