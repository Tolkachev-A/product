import bodyParser from "body-parser";
import {productRouter} from "./routes/productRouter";

const express = require("express");


const app = express()
const port = 5000


app.use(bodyParser())


app.use("/products", productRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
