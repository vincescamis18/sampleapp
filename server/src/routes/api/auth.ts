import express, { Request, Response } from "express";
import passport from "passport";

const router: any = express.Router();

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req: Request, res: Response) => {
	console.log("login success");
	if (req.user) {
		console.log(req.user);
		res.status(200).json({
			success: true,
			message: "successfull",
			user: req.user,
			token: "hatdo",
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
