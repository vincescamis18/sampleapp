"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserArchives = void 0;
const mongoose = require("mongoose");
const userArchiveSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    records: [
        {
            record: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
        },
    ],
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.UserArchives = mongoose.model("user_archives", userArchiveSchema);
