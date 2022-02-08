"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
    surname: { type: String },
    given_name: { type: String },
    user_profile: { type: String },
    province: { type: String },
    city: { type: String },
    barangay: { type: String },
    email: { type: String },
    contact_number: { type: String },
});
exports.Users = mongoose.model("users", usersSchema);
