import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import Address from "../../../domain/customer/value_object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update_customer_dto";

export default class CustomerUpdateUseCase {

    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id)
        customer.changeName(input.name)
        customer.address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        await this.customerRepository.update(customer)
        return {
            id: customer.getId(),
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city
            }
        }
    }  
}