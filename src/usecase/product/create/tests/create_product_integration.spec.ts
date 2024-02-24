import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../../infrastructure/product/sequelize/model/product_model";
import ProductRepository from "../../../../infrastructure/product/sequelize/repository/product_repository";
import CreateProductUsecase from "../create_product_usecase";

describe("Create product integration usecase test", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository()
        const input = {
            type: "A",
            name: "Product A",
            price: 10,
        }
        const usecase = new CreateProductUsecase(productRepository)
        const output = await usecase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

})