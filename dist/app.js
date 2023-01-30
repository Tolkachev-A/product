"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const productRouter_1 = require("./routes/productRouter");
const express = require("express");
const app = express();
const port = 5000;
app.use((0, body_parser_1.default)());
app.use("/products", productRouter_1.productRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
