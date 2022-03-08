"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose = require("mongoose");
const featuredMemorySchema = new mongoose.Schema({
    date_start: { type: Date },
    date_end: { type: Date },
    record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.Users = mongoose.model("featured_memories", featuredMemorySchema);
