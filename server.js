const express = require('express');
const session = require('express-session');
const swaggerUi=require("swagger-ui-express")
const app = express();
const cors=require("cors")
const mysql=require("mysql2")

const path = require('path');
const swaggerDocument = require(path.join(__dirname, 'swagger_output.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())


//------------ Bodyparser Configuration ------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Routes ------------//
const authRoutes=require("./routes/authRoutes")
const employee=require("./routes/employeeRoutes")
app.use("/auth", authRoutes);
app.use("/employees",employee)

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));