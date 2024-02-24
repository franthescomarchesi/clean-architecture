import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/sequelize/model/customer_model"
import { customerRoute } from "./customer/routes/customer_route";
import { productRoute } from "./product/routes/product_route";
import ProductModel from "../product/sequelize/model/product_model";

export const app: Express = express()
app.use(express.json())
app.use("/customer", customerRoute)
app.use("/product", productRoute)

export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync()
}
setupDb()