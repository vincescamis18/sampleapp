"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
    type: [{ type: String }],
    description: { type: String },
    status: { type: String },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.Report = mongoose.model("reports", reportSchema);
