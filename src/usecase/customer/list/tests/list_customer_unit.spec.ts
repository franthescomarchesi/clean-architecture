import CustomerFactory from "../../../../domain/customer/factory/customer_factory";
import CustomerListUseCase from "../list_customer_usecase";

const customer01 = CustomerFactory.createWithAddress("customer 01", "street 01", 1, "zip 01", "city 01")
const customer02 = CustomerFactory.createWithAddress("customer 02", "street 02", 2, "zip 02", "city 02")

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer01, customer02])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("List customer unit usecase test", () => {
    it("should list customers", async () => {
        const customerRepository = mockRepository();
        const customerListUseCase = new CustomerListUseCase(customerRepository)
        const output = await customerListUseCase.execute({})
        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer01.getId())
        expect(output.customers[0].name).toBe(customer01.name)
        expect(output.customers[0].address.street).toBe(customer01.address.street)
        expect(output.customers[1].id).toBe(customer02.getId())
        expect(output.customers[1].name).toBe(customer02.name)
        expect(output.customers[1].address.street).toBe(customer02.address.street)
    })
})