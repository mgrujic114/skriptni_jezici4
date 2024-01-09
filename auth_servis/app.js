const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const app = express();


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    Users.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            user: rows.username,
            role: rows.admin
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        console.log(token);
        res.json({ token: token, id: rows.id});
    }).catch( err => res.status(500).json({msg: "Error"}) );
});



app.post('/login', (req, res) => {
    Users.findOne({ where: { username: req.body.username } })
      .then( usr => {
        if (bcrypt.compareSync(req.body.password, usr.password)) {
            const obj = {
                userId: usr.id,
                user: usr.username,
                role: usr.admin
            };
            const token = jwt.sign(obj, 
						process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: token, role: usr.admin, id: usr.id });
        } else {
            res.status(400).json({ msg: "Invalid credentials"});
        }
      })
      .catch( err => res.status(500).json(err) );
});



app.listen({ port: 9001 }, async () => {
    await sequelize.authenticate();
});
