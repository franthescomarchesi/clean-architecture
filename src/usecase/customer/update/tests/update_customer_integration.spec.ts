import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../../infrastructure/customer/sequelize/model/customer_model";
import CustomerFactory from "../../../../domain/customer/factory/customer_factory";
import CustomerRepository from "../../../../infrastructure/customer/sequelize/repository/customer_repository";
import CustomerUpdateUseCase from "../update_customer_usecase";

describe("Update customer integration usecase test", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should update a customer", async () => {
        const customer01 = CustomerFactory.createWithAddress("customer 01", "street 01", 1, "zip 01", "city 01")
        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer01)
        const address = {
            street: "street",
            city: "city",
            number: 123,
            zip: "zip"
        }
        const input = {
            id: customer01.getId(),
            name: "John",
            address
        }
        const customerListUseCase = new CustomerUpdateUseCase(customerRepository)
        const output = await customerListUseCase.execute(input)
        expect(output).toEqual({
            id: customer01.getId(),
            name: input.name,
            address
        })
    })

})