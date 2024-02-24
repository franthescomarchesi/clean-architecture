import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../../infrastructure/product/sequelize/model/product_model";
import ProductRepository from "../../../../infrastructure/product/sequelize/repository/product_repository";
import ProductFactory from "../../../../domain/product/factory/product_factory";
import ListProductUseCase from "../list_product_usecase";

describe("List product integration usecase test", () => {

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

    it("should list products", async () => {
        const productRepository = new ProductRepository()
        const inputA = {
            type: "A",
            name: "Product A",
            price: 10,
        }
        const inputB = {
            type: "B",
            name: "Product B",
            price: 20,
        }
        const productA = ProductFactory.create(inputA.type, inputA.name, inputA.price)
        const productB = ProductFactory.create(inputB.type, inputB.name, inputB.price)
        await productRepository.create(productA)
        await productRepository.create(productB)
        const usecase = new ListProductUseCase(productRepository)
        const output = await usecase.execute({})
        expect(output).toEqual({
            products: [{
                id: productA.getId(),
                name: productA.name,
                price: productA.price
            }, {
                id: productB.getId(),
                name: productB.name,
                price: inputB.price * 2
            }]
        })
    })

})