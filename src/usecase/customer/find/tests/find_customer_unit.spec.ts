import CustomerRepository from "../../../../infrastructure/customer/sequelize/repository/customer_repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value_object/address";
import FindCustomerUseCase from "../find_customer_usecase";

const addressExpected = {
    street: "street",
    number: 123,
    city: "city",
    zip: "zip"
}

const outputExpected = {
    id: "123",
    name: "teste",
    address: addressExpected
}

const custumer = new Customer(outputExpected.id, outputExpected.name)
const address = new Address(addressExpected.street, addressExpected.number, addressExpected.zip, addressExpected.city)
custumer.address = address;

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(custumer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Find customer unit usecase test", () => {
    
    it("shoult find a customer", async () => {
        const customerRepository = mockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)
        
        await customerRepository.create(custumer)

        const input = {
            id: outputExpected.id
        }

        const output = await usecase.execute(input)

        expect(output).toEqual(outputExpected)
    })

    it("should not find a customer", async () => {
        const customerRepository = mockRepository()
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(customerRepository)
        
        await customerRepository.create(custumer)

        const input = {
            id: outputExpected.id
        }

        expect(() => usecase.execute(input)).rejects.toThrow("Customer not found")
    })

})