"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
    image: { type: String },
    title: { type: String },
    date: { type: Date },
    owner: { type: String },
    description: { type: String },
    tag: { type: String },
    address: { type: String },
    coordinate: { type: String },
});
exports.Record = mongoose.model("records", recordSchema);
