"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
    type: { type: String },
    title: { type: String },
    description: { type: String },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.Report = mongoose.model("reports", reportSchema);
