import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../../infrastructure/product/sequelize/model/product_model";
import ProductRepository from "../../../../infrastructure/product/sequelize/repository/product_repository";
import FindProductUseCase from "../find_product_usecase";
import ProductFactory from "../../../../domain/product/factory/product_factory";

describe("Find product integration usecase test", () => {

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

    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const input = {
            type: "A",
            name: "Product A",
            price: 10,
        }
        const product = ProductFactory.create(input.type, input.name, input.price)
        await productRepository.create(product)
        const usecase = new FindProductUseCase(productRepository)
        const output = await usecase.execute({
            id: product.id
        })
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })

})