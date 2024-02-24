import CustomerCreateUseCase from "../create_customer_usecase"

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Create customer unit usecase test", () => {
    it("should create a customer", async () => {
        const address = {
            street: "street",
            city: "city",
            number: 123,
            zip: "zip"
        }
        const input = {
            name: "John",
            address
        }
        const customerRepository = mockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)
        const output = await customerCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address
        })
    })

    it("should thrown an error when name is missing", async () => {
        const address = {
            street: "street",
            city: "city",
            number: 123,
            zip: "zip"
        }
        const input = {
            name: "John",
            address
        }
        const customerRepository = mockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)
        input.name = ""
        expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should thrown an error when street is missing", async () => {
        const address = {
            street: "street",
            city: "city",
            number: 123,
            zip: "zip"
        }
        const input = {
            name: "John",
            address
        }
        const customerRepository = mockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)
        address.street = ""
        expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Street is required")
    })
})