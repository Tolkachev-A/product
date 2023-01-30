import {Request, Response, Router} from "express";
import {productRepositories} from "../repositories/product-repositories";

export const productRouter = Router();


productRouter.get("/", ( req: Request, res: Response ) => {

  const products = productRepositories.findProducts(req.query.title?.toString())


  if (products) {
    res.send(products)
    return
  }

  res.send(404)

})
// productRouter.get("/:productTitle", ( req: Request, res: Response ) => {
//   const product = products.find(p => p.name === req.params.productTitle)
//   if (product) {
//     res.send(product)
//
//     return
//   }
//   res.send(404)
// })

productRouter.post("/", ( req: Request, res: Response ) => {

  const products = productRepositories.createProduct(req.body.title)
  res.status(201).send(products)

})

productRouter.delete("/:id", ( req: Request, res: Response ) => {
  const isDeleteProducts = productRepositories.deleteProduct(req.params.id.toString())

  if (isDeleteProducts) {
    res.send(204)
  }

  res.send(404)
})


productRouter.put("/:id", ( req: Request, res: Response ) => {
  const isUpdateProducts = productRepositories.updateProduct(req.params.id, req.body.title)

  if (isUpdateProducts) {

    res.status(200).send(productRepositories.findProducts(null))
    return

  }
  res.send(404)

})

