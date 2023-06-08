const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usermodel } = require("../model/user.model");
const { sendEmail } = require('../nodemailer/sendemail');


const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    try {
        // check user already exists
        let user = await usermodel.find({ email });
        if (user.length > 0) {
            res.status(400).send("user already exists")
        } else {
            bcrypt.hash(password, 5, async (err, hashPassword) => {
                if (err) res.send("err whhile signup password");
                else {
                    let newuser = new usermodel({ name, email, password: hashPassword });
                    await newuser.save();
                    res.status(201).send('user register success');
                }

            })
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        // check user already exists
        let user = await usermodel.find({ email });
        console.log(user);
        if (user.length === 0) {
            res.status(400).send("user doesn't exists")
        } else {
            let hashPassword = user[0].password;
            bcrypt.compare(password, hashPassword, async (err, result) => {
                if (result) {
                    const otp = Math.round(Math.random() * 9999)+"";
                    console.log(otp);
                    sendEmail({ email: email, subject: "Login otp", body: otp });

                    let token = jwt.sign({ userId: user[0]._id }, 'masai', { expiresIn: '7d' })
                    console.log(token);
                    res.status(201).json({ message: "user logged in ", token });
                } else {

                    res.status(400).send({ message: "error while login ", err });
                }
            })
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})


module.exports = { userRouter }
