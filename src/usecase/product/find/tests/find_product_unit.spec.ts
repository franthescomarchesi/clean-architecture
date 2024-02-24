import ProductFactory from "../../../../domain/product/factory/product_factory"
import FindProductUseCase from "../find_product_usecase"

const product = ProductFactory.create("A", "Product A", 10)

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Find product unit usecase test", () => {

    it("should find a product", async () => {
        const input = {
            id: product.getId()
        }
        const repository = mockRepository()
        const findProductUseCase = new FindProductUseCase(repository)
        const output = await findProductUseCase.execute(input)
        expect(output).toEqual({
            id: product.getId(),
            name: product.name,
            price: product.price
        })
    })

})