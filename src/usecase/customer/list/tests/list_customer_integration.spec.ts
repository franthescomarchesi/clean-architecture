import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../../infrastructure/customer/sequelize/model/customer_model";
import CustomerRepository from "../../../../infrastructure/customer/sequelize/repository/customer_repository";
import CustomerListUseCase from "../list_customer_usecase";
import CustomerFactory from "../../../../domain/customer/factory/customer_factory";

describe("List customer integration usecase test", () => {

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

    it("should list customers", async () => {
        const customer01 = CustomerFactory.createWithAddress("customer 01", "street 01", 1, "zip 01", "city 01")
        const customer02 = CustomerFactory.createWithAddress("customer 02", "street 02", 2, "zip 02", "city 02")
        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer01)
        await customerRepository.create(customer02)
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