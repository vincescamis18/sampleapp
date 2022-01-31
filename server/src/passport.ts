import passport from "passport";
import PassportGoogleOauth20 from "passport-google-oauth20";
import PassportFacebook from "passport-facebook";
import PassportGithub2 from "passport-github2";

const GoogleStrategy = PassportGoogleOauth20.Strategy;
const FacebookStrategy = PassportFacebook.Strategy;
const GithubStrategy = PassportGithub2.Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: `${process.env.GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
			callbackURL: "/auth/google/callback",
		},
		function (accessToken: any, refreshToken: any, profile: any, done: any) {
			console.log("profile|||", profile);
			done(null, profile);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: `${process.env.FACEBOOK_APP_ID}`,
			clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
			callbackURL: "/auth/facebook/callback",
		},
		function (accessToken: any, refreshToken: any, profile: any, done: any) {
			done(null, profile);
		}
	)
);

passport.use(
	new GithubStrategy(
		{
			clientID: `${process.env.GITHUB_CLIENT_ID}`,
			clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
			callbackURL: "/auth/github/callback",
		},
		function (accessToken: any, refreshToken: any, profile: any, done: any) {
			done(null, profile);
		}
	)
);

passport.serializeUser((user: any, done: any) => {
	done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
	done(null, user);
});
