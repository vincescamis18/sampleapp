"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccess = void 0;
const mongoose = require("mongoose");
const userAccessSchema = new mongoose.Schema({
    user_access: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.UserAccess = mongoose.model("user_access", userAccessSchema);
