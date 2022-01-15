"use strict";
// @ts-nocheck
const jwt = require("jsonwebtoken");
function authentication(req, res, next) {
    try {
        // [S:00] Check for misssing token
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ err: "Authorization denied, No token" });
        // [S:01] Send the decoded token after verifying
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        return res.status(401).json({ err: "Authorization denied, Invalid token" });
    }
}
module.exports = authentication;
