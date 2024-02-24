import ProductFactory from "../../../../domain/product/factory/product_factory"
import ListProductUseCase from "../list_product_usecase"

const productA = ProductFactory.create("A", "Product A", 10)
const productB = ProductFactory.create("B", "Product B", 20)

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB]))
    }
}

describe("List product unit usecase test", () => {

    it("should list all products", async () => {
        const repository = mockRepository()
        const listProductUseCase = new ListProductUseCase(repository)
        const output = await listProductUseCase.execute({})
        expect(output).toEqual({
            products: [{
                id: productA.getId(),
                name: productA.name,
                price: productA.price
            }, {
                id: productB.getId(),
                name: productB.name,
                price: productB.price
            }]
        })
    })

})