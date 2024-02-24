import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import CustomerInterface from "../entity/customer_interface";
import Address from "../value_object/address";

export default class CustomerFactory {

    public static create(name: string): CustomerInterface {
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name: string, street: string, number: number, zip: string, city: string): CustomerInterface {
        const customer = new Customer(uuid(), name);
        customer.address = new Address(street, number, zip, city);
        return customer;
    }

}