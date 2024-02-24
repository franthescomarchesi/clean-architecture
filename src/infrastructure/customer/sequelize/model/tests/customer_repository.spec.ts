import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer_model";
import CustomerRepository from "../../repository/customer_repository";
import Customer from "../../../../../domain/customer/entity/customer";
import Address from "../../../../../domain/customer/value_object/address";

describe("Customer repository test", () => {

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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({
           where: {
                id: customer.getId()
           } 
        });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.getId(),
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        customer.changeName("Customer 02")
        customer.address = new Address("Street2", 9, "zip2", "city2")
        await customerRepository.update(customer)
        const customerModel = await CustomerModel.findOne({
           where: {
                id: customer.getId()
           } 
        });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.getId(),
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const customerResult = await customerRepository.find(customer.getId())
        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("123");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all products", async () => {
        const customerRepository = new CustomerRepository();
        const customer01 = new Customer("1", "Customer 01");
        customer01.address = new Address("Street", 8, "zip", "city");
        customer01.activate();
        customer01.rewardPoints = 100;
        await customerRepository.create(customer01);
        const customer02 = new Customer("2", "Customer 02");
        customer02.address = new Address("Street2", 9, "zip2", "city2");
        await customerRepository.create(customer02);
        const customers = [customer01, customer02];
        const customersResult = await customerRepository.findAll()
        expect(customers).toEqual(customersResult);
    })

});