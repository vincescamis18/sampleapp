"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    date: { type: Date, default: Date.now },
});
exports.Item = mongoose.model("items", itemSchema);
