import Customer from "../../../domain/customer/entity/customer";
import CustomerInterface from "../../../domain/customer/entity/customer_interface";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list_customer_dto";

export default class CustomerListUseCase {

    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const result = await this.customerRepository.findAll()
        return {
            customers: result.map((customer) => ({
                id: customer.getId(),
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            }))
        }
    }
}