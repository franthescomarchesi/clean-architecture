import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../../infrastructure/product/sequelize/model/product_model";
import ProductRepository from "../../../../infrastructure/product/sequelize/repository/product_repository";
import ProductFactory from "../../../../domain/product/factory/product_factory";
import UpdateProductUseCase from "../update_product_usecase";

describe("Update product integration usecase test", () => {

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

    it("should update a product", async () => {
        const productRepository = new ProductRepository()
        const input = {
            type: "A",
            name: "Product A",
            price: 10,
        }
        const product = ProductFactory.create(input.type, input.name, input.price)
        await productRepository.create(product)
        const usecase = new UpdateProductUseCase(productRepository)
        const inputUpdated = {
            id: product.getId(),
            name: "Product B",
            price: 20
        }
        const output = await usecase.execute(inputUpdated)
        expect(output).toEqual({
            id: product.getId(),
            name: inputUpdated.name,
            price: inputUpdated.price
        })
    })

})