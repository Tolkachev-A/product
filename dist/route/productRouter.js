"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
let products = [{ id: 1, name: "tomato" }, { id: 2, name: "cucumber" }];
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/", (req, res) => {
    if (req.query.title) {
        let params = req.query.title.toString();
        const productsFilter = products.filter(p => p.name.indexOf(params) > -1);
        if (productsFilter.length > 0) {
            res.send(productsFilter);
            return;
        }
        res.send(404);
    }
    res.send(products);
});
exports.productRouter.get("/:productTitle", (req, res) => {
    const product = products.find(p => p.name === req.params.productTitle);
    if (product) {
        res.send(product);
        return;
    }
    res.send(404);
});
exports.productRouter.delete("/:id", (req, res) => {
    if (req.params.id) {
        const id = req.params.id.toString();
        const newProducts = products.filter(p => p.id.toString() !== id);
        if (newProducts.length < products.length) {
            res.send(204);
            products = newProducts;
        }
    }
    res.send(404);
});
exports.productRouter.post("/", (req, res) => {
    const newProduct = { id: new Date().getMilliseconds(), name: req.body.title };
    products.push(newProduct);
    res.status(201).send(products);
});
exports.productRouter.put("/:id", (req, res) => {
    const idProduct = req.params.id;
    const updateProduct = products.find(p => p.id.toString() === idProduct);
    if (updateProduct) {
        updateProduct.name = req.body.title;
        res.status(200).send(updateProduct);
        return;
    }
    res.send(404);
});
