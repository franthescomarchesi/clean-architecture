import Address from "../../../../domain/customer/value_object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer_repository_interface";
import CustomerModel from "../model/customer_model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.getId(),
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        })
    }
    
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, {
            where: {
                id: entity.getId()
            }
        })
    }

    async find(id: string): Promise<Customer> {
        let customerModel
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Customer not found")
        }
        const customer = new Customer(customerModel.id, customerModel.name)
        customer.address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
        if (customerModel.active) {
            customer.activate()
        }
        customer.rewardPoints = customerModel.rewardPoints
        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        const customers = customerModels.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name)
            customer.address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
            if (customerModel.active) {
                customer.activate()
            }
            customer.rewardPoints = customerModel.rewardPoints
            return customer
        });
        return customers
    }

}