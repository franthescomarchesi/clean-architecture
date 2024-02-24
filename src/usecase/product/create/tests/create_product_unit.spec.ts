import CreateProductUsecase from "../create_product_usecase"

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Create product unit usecase test", () => {

    it("should create a product", async () => {
        const input = {
            type: "A",
            name: "Product A",
            price: 10,
        }
        const repository = mockRepository()
        const productCreateUseCase = new CreateProductUsecase(repository)
        const output = await productCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should thrown an error when name is missing", async () => {
        const input = {
            type: "A",
            name: "",
            price: 10,
        }
        const repository = mockRepository()
        const productCreateUseCase = new CreateProductUsecase(repository)
        expect(() => productCreateUseCase.execute(input)).rejects.toThrow("Name is required")
    })

})