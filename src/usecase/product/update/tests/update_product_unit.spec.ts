import ProductFactory from "../../../../domain/product/factory/product_factory"
import UpdateProductUseCase from "../update_product_usecase"

const product = ProductFactory.create("A", "Product A", 10)

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Updade product unit usecase test", () => {

    it("should update a product", async () => {
        const input = {
            id: product.id,
            name: "Product B",
            price: 20
        }
        const repository = mockRepository()
        const updadeProductUseCase = new UpdateProductUseCase(repository)
        const output = await updadeProductUseCase.execute(input)
        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

})