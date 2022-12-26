"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 5000;
let products = [{ id: 1, name: "tomato" }, { id: 2, name: "cucumber" }];
app.use((0, body_parser_1.default)());
app.get("/", (req, res) => {
    const message = "Hello  !";
    res.send(message);
});
app.get("/products", (req, res) => {
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
app.get("/products/:productTitle", (req, res) => {
    const product = products.find(p => p.name === req.params.productTitle);
    if (product) {
        res.send(product);
        return;
    }
    res.send(404);
});
app.delete("/products/:id", (req, res) => {
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
app.post("/products", (req, res) => {
    const newProduct = { id: new Date().getMilliseconds(), name: req.body.title };
    products.push(newProduct);
    res.status(201).send(products);
});
app.put("/products/:id", (req, res) => {
    const idProduct = req.params.id;
    const updateProduct = products.find(p => p.id.toString() === idProduct);
    if (updateProduct) {
        updateProduct.name = req.body.title;
        res.status(200).send(updateProduct);
        return;
    }
    res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
