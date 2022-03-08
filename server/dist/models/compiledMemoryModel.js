"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompiledMemory = void 0;
const mongoose = require("mongoose");
const compiledMemorySchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    images: [{ link: String }],
    records: [{ record: { type: mongoose.Schema.Types.ObjectId, ref: "records" } }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.CompiledMemory = mongoose.model("compiled_memories", compiledMemorySchema);
