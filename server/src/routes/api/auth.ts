import express, { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { Users, IUsers } from "../../models/userzModel";
const router: any = express.Router();

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req: any, res: Response) => {
	if (req.user) {
		//[S:01] Checking for existing email
		console.log(req.user.emails[0].value);
		Users.findOne({
			email: req.user.emails[0].value,
		}).then((user: IUsers) => {
			if (user) {
				// create a jwt and send the token and user details
				console.log("retrieving an existing user", user);
				jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {}, (err, token) => {
					return res.status(200).json({ token, user });
				});
			} else {
				const newUser = new Users({
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
				newUser.save().then((user: IUsers) => {
					console.log("created a new user", user);

					// create a jwt and send the token and user details
					jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {}, (err, token) => {
						return res.status(200).json({ token, user });
					});
				});
			}
		});
	}
});

router.get("/login/failed", (req: Request, res: Response) => {
	console.log("login failed");
	res.status(401).json({
		success: false,
		message: "failure",
	});
});

router.get("/logout", (req: Request, res: Response) => {
	req.logout();
	res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

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

router.get("/github", passport.authenticate("github", { scope: ["profile", "email"] }));

router.get(
	"/github/callback",
	passport.authenticate("github", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

module.exports = router;
