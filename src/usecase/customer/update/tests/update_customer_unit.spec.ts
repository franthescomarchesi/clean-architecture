import CustomerFactory from "../../../../domain/customer/factory/customer_factory";
import CustomerUpdateUseCase from "../update_customer_usecase";

const customer = CustomerFactory.createWithAddress("John", "street", 123, "zip", "city")

const input = {
    id: customer.getId(),
    name: "John updated",
    address: {
        street: "street updated",
        number: 1234,
        zip: "zip updated",
        city: "city updated"
    }
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Update customer unit usecase test", () => {
    it("should update a customer", async () => {
        const customerRepository = mockRepository();
        const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository)
        const output = await customerUpdateUseCase.execute(input)
        expect(output).toEqual(input)
    })
})