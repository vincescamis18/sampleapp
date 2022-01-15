"use strict";
// @ts-nocheck
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../../middlewares/authentication");
const User = require("../../models/userModel");
// [T:00] Signup token with JWT
// @route   POST /api/users/signup
// @dessc   Create new user
// @access  Public
router.post("/signup", (req, res) => {
    //[S:00] Check for missing field {username, email, password}
    const { username, email, password, passwordCheck } = req.body;
    if (!username || !email || !password || !passwordCheck)
        return res.status(400).json({ err: "Missing field" });
    // [S:01] Checking if the password and password Check matach
    if (password != passwordCheck)
        return res.status(400).json({ err: "Password does't match" });
    //[S:01] Checking for existing email && username
    User.findOne({ email }).then(user => {
        if (user)
            return res.status(400).json({ err: "Email already exist" });
        User.findOne({ username }).then(user => {
            if (user)
                return res.status(400).json({ err: "Username already exist" });
            // [S:02] Creating Salt and hash the password
            bcrypt.genSalt(10, (err, salt) => {
                if (err)
                    throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    // [S:03] Sending token after creating new user
                    const newUser = new User({ username, email, password: hash });
                    newUser.save().then(user => {
                        jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                },
                            });
                        });
                    });
                });
            });
        });
    });
});
// [T:00] Login token with JWT
// @route   POST /api/users/login
// @dessc   Sending token to active user
// @access  Public
router.post("/login", (req, res) => {
    // [S:00] Check for missing field {username || email, password}
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ err: "Missing field" });
    // [S:01] Checking for existing email || username
    User.findOne(email.includes("@") ? { email: email } : { username: email }).then(user => {
        if (!user)
            return res.status(400).json({ err: "User doesn't exist" });
        //[S:02] Validating password of user's email || username
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch)
                return res.status(400).json({ err: "Incorrect password" });
            //[S:03] Sending token after user validation
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
                res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    },
                });
            });
        });
    });
});
// [T:00] Getting the data using id
// @route   /api/users/data/:id
// @dessc   Get user data by ID
// @access  Private
router.get("/data/:id", auth, (req, res) => {
    User.findById(req.params.id)
        .select("-password")
        .then(user => res.json(user))
        .catch(err => res.json({ err }));
});
// [T:00] Getting the data using token
// @route   /api/users/data
// @dessc   Get user data by ID
// @access  Private
router.get("/data", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => res.status(200).json({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    }))
        .catch(err => res.json({ err }));
});
// [T:00] Getting the data using token
// @route   /api/users/data
// @dessc   Get user data by ID
// @access  Private
router.get("/verifyToken", auth, (req, res) => {
    User.findById(req.user.id)
        .then(() => res.status(200).json({ validToken: true }))
        .catch(err => res.json({ err }));
});
module.exports = router;
