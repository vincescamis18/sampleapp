"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
    images: [{ link: String }],
    title: { type: String },
    date: { type: Date },
    owner: { type: String },
    description: { type: String },
    tag: { type: String },
    address: { type: String },
    coordinate_x: { type: Number },
    coordinate_y: { type: Number },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
exports.Record = mongoose.model("records", recordSchema);
