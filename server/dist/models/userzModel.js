"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userz = void 0;
const mongoose = require("mongoose");
const userzSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    user_profile: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    barangay: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    firebase_id: { type: String, required: true },
});
exports.Userz = mongoose.model("users", userzSchema);
