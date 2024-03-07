import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../../infrastructure/customer/sequelize/model/customer_model";
import CustomerRepository from "../../../../infrastructure/customer/sequelize/repository/customer_repository";
import CustomerCreateUseCase from "../create_customer_usecase";

describe("Create customer integration usecase test", () => {

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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository()
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
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)
        const output = await customerCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address
        })
    })

})