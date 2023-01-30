"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepositories = void 0;
let products = [{ id: 1, name: "tomato" }, { id: 2, name: "cucumber" }];
exports.productRepositories = {
    findProducts(title) {
        if (title) {
            const filterProducts = products.filter(p => p.name.indexOf(title) > -1);
            if (filterProducts) {
                return products;
            }
        }
        return products;
    },
    createProduct(title) {
        const newProduct = { id: new Date().getMilliseconds(), name: title };
        products.push(newProduct);
        return products;
    },
    deleteProduct(id) {
        if (id) {
            const newProducts = products.filter(p => p.id.toString() !== id);
            if (newProducts.length < products.length) {
                products = newProducts;
                return true;
            }
        }
        return false;
    },
    updateProduct(idProduct, title) {
        const updateProduct = products.find(p => p.id.toString() === idProduct);
        if (updateProduct) {
            updateProduct.name = title;
            return true;
        }
        return false;
    }
};
