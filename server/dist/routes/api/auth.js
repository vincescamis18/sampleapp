"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userzModel_1 = require("../../models/userzModel");
const router = express_1.default.Router();
const CLIENT_URL = "http://localhost:3000";
router.get("/login/success", (req, res) => {
    if (req.user) {
        //[S:01] Checking for existing email
        console.log(req.user.emails[0].value);
        userzModel_1.Users.findOne({
            email: req.user.emails[0].value,
        }).then((user) => {
            if (user) {
                // create a jwt and send the token and user details
                console.log("retrieving an existing user", user);
                jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {}, (err, token) => {
                    return res.status(200).json({ token, user });
                });
            }
            else {
                const newUser = new userzModel_1.Users({
                    given_name: req.user.name.givenName,
                    surname: "",
                    user_profile: req.user.photos[0].value,
                    province: "",
                    city: "",
                    barangay: "",
                    email: req.user.emails[0].value,
                    contact_number: "",
                });
                // save new user to database with info from social media authentication
                newUser.save().then((user) => {
                    console.log("created a new user", user);
                    // create a jwt and send the token and user details
                    jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {}, (err, token) => {
                        return res.status(200).json({ token, user });
                    });
                });
            }
        });
    }
});
router.get("/login/failed", (req, res) => {
    console.log("login failed");
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));
// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", { failureRedirect: "/login/failed" }),
// 	function (req: Request, res: Response) {
// 		// Successful authentication, redirect home.
// 		// res.json({ user: "this is a sample" });
// 		const token = "101asdasd";
// 		res.redirect(`${CLIENT_URL}?client=${token}`);
// 	}
// );
router.get("/github", passport_1.default.authenticate("github", { scope: ["profile", "email"] }));
router.get("/github/callback", passport_1.default.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["profile", "email"] }));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));
module.exports = router;
