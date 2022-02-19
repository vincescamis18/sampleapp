"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bug = void 0;
const mongoose = require("mongoose");
const bugSchema = new mongoose.Schema({
    type: { type: String },
    title: { type: String },
    description101: { type: String },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.Bug = mongoose.model("bugs", bugSchema);
