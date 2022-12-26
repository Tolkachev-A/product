import express, {Request, Response} from "express"
import bodyParser from "body-parser";

const app = express()
const port = 5000

let products = [{ id: 1, name: "tomato" }, { id: 2, name: "cucumber" }]

app.use(bodyParser())

app.get("/", ( req: Request, res: Response ) => {
  const message = "Hello  !"
  res.send(message)
})

app.get("/products", ( req: Request, res: Response ) => {
  if (req.query.title) {
    let params = req.query.title.toString()

    const productsFilter = products.filter(p => p.name.indexOf(params) > -1)

    if (productsFilter.length > 0) {
      res.send(productsFilter)
      return
    }

    res.send(404)
  }
  res.send(products)
})
app.get("/products/:productTitle", ( req: Request, res: Response ) => {
  const product = products.find(p => p.name === req.params.productTitle)
  if (product) {
    res.send(product)

    return
  }
  res.send(404)
})

app.delete("/products/:id", ( req: Request, res: Response ) => {
  if (req.params.id) {
    const id = req.params.id.toString()
    const newProducts = products.filter(p => p.id.toString() !== id)
    if (newProducts.length < products.length) {
      res.send(204)
      products = newProducts
    }
  }
  res.send(404)
})

app.post("/products", ( req: Request, res: Response ) => {
  const newProduct = { id: new Date().getMilliseconds(), name: req.body.title }
  products.push(newProduct)
  res.status(201).send(products)
})

app.put("/products/:id", ( req: Request, res: Response ) => {
  const idProduct = req.params.id;
  const updateProduct = products.find(p => p.id.toString() === idProduct)
  if (updateProduct) {
    updateProduct.name = req.body.title

    res.status(200).send(updateProduct)
    return

  }
  res.send(404)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
