const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const swaggerUi=require("swagger-ui-express")
const app = express();

const path = require('path');
const swaggerDocument = require(path.join(__dirname, 'swagger_output.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

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
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));