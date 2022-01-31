"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const FacebookStrategy = passport_facebook_1.default.Strategy;
const GithubStrategy = passport_github2_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    console.log("profile|||", profile);
    done(null, profile);
}));
passport_1.default.use(new FacebookStrategy({
    clientID: `${process.env.FACEBOOK_APP_ID}`,
    clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
    callbackURL: "/auth/facebook/callback",
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));
passport_1.default.use(new GithubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "/auth/github/callback",
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
