"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_repositories_1 = require("../repositories/product-repositories");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/", (req, res) => {
    var _a;
    const products = product_repositories_1.productRepositories.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    if (products) {
        res.send(products);
        return;
    }
    res.send(404);
});
// productRouter.get("/:productTitle", ( req: Request, res: Response ) => {
//   const product = products.find(p => p.name === req.params.productTitle)
//   if (product) {
//     res.send(product)
//
//     return
//   }
//   res.send(404)
// })
exports.productRouter.post("/", (req, res) => {
    const products = product_repositories_1.productRepositories.createProduct(req.body.title);
    res.status(201).send(products);
});
exports.productRouter.delete("/:id", (req, res) => {
    const isDeleteProducts = product_repositories_1.productRepositories.deleteProduct(req.params.id.toString());
    if (isDeleteProducts) {
        res.send(204);
    }
    res.send(404);
});
exports.productRouter.put("/:id", (req, res) => {
    const isUpdateProducts = product_repositories_1.productRepositories.updateProduct(req.params.id, req.body.title);
    if (isUpdateProducts) {
        res.status(200).send(product_repositories_1.productRepositories.findProducts(null));
        return;
    }
    res.send(404);
});
