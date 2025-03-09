/*import express from 'express'
import bcryt from 'bcrypt'
import {user} from '../model/userValidation.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/signup", async(req,res) => {
    const{username,email,password} = req.body
    const existingUser = await user.findOne({email})
    if(existingUser)
        return res.json({message: 'User already exists'})
    const hashPass = await bcryt.hash(password, 15)

    const savedUser = new user({
        username,
        email,
        password:hashPass,
    })
    await savedUser.save()
    return res.json({status: true, message: 'Your account has been successfully created'})
})
router.post('/login',async(req,res) => {
    const {email,password} = req.body
    const existingUser = await user.findOne({email})
    if(!existingUser)
        return res.json({message: 'User account not exists'})
    
    //const generateToken(existingUser,res) => {
    const checkPassword = await bcryt.compare(password, existingUser.password)
    if(!checkPassword)
        return res.json({message: 'Incorrect password! please try again'})
    
    const token = jwt.sign({username: existingUser.username}, process.env.KEY, {expiresIn:'30min'})
    res.cookie('token', token, {httpOnly: true, maxAge: 180000})
    return res.json({status: true, message: "Log in Successfully!"})
})


export {router as rt}*/

import express from 'express';
import bcrypt from 'bcrypt'; // Corrected the import of bcrypt
import { user } from '../model/userValidation.js'; // Import your user model
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
const router = express.Router();

// Helper function to generate a token and set it as a cookie
const generateTokenAndSetCookie = (existingUser, res) => {
    const token = jwt.sign(
        { username: existingUser.username },
        process.env.KEY,
        { expiresIn: '30min' } // Token valid for 30 minutes
    );

    // Set token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 }); // 30 min in milliseconds
};

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.json({ message: 'User already exists' });
    }

    // Hash the password (bcrypt rounds should be a number, corrected to 10 here)
    const hashPass = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const savedUser = new user({
        username,
        email,
        password: hashPass,
    });
    await savedUser.save();

    return res.json({ status: true, message: 'Your account has been successfully created' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        return res.json({ message: 'User account does not exist' });
    }

    // Check if the provided password is correct
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
        return res.json({ message: 'Incorrect password! Please try again' });
    }

    // Generate the token and set it as a cookie
    generateTokenAndSetCookie(existingUser, res);

    // Respond with a success message
    return res.json({ status: true, message: 'Logged in Successfully!' });
});

router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const userExist = await user.findOne({email})
        if (!userExist)
            return res.json({ message: 'User account does not exist' })

        const token = jwt.sign({ id: userExist._id }, process.env.KEY, { expiresIn: '5m' })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ijm.research.official@gmail.com',
                pass: 'pgqc just pcgv vbyt'
            }
        });
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

        var mailOptions = {
            from: 'ijm.research.official@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${encodedToken}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({message: 'Get error to send the email'})
            } else {
                return res.json({status: true, message: 'Email sent'})
            }
        });
    } catch (error) {
        console.log(error)
    }
})

router.post('/resetPassword/:token', async(req,res) => {
    const {token} = req.params;
    const {password} = req.body;

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        // Hash the password (bcrypt rounds should be a number, corrected to 10 here)
        const hashPass = await bcrypt.hash(password, 10);
        await user.findByIdAndUpdate({_id: id}, {password: hashPass})
        return res.json({status: true, message: "Password is successfully updated"})
    } catch (error) {
        return res.json({ status: false, message: 'An error occurred', error: error.message });     
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})

export { router as rt };
