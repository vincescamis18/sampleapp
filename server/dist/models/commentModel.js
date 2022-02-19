"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
    comments: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            message: { type: String, require: true },
            date: { type: Date, default: Date.now },
        },
    ],
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.Comment = mongoose.model("comments", CommentSchema);
