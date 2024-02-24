import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/sequelize/model/customer_model";
import CustomerRepository from "../../../../infrastructure/customer/sequelize/repository/customer_repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value_object/address";
import FindCustomerUseCase from "../find_customer_usecase";

describe("Find customer integration usecase test", () => {
    
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("shoult find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

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
        await customerRepository.create(custumer)

        const input = {
            id: outputExpected.id
        }

        const output = await usecase.execute(input)

        expect(output).toEqual(outputExpected)
    });

})