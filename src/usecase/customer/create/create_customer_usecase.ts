import CustomerFactory from "../../../domain/customer/factory/customer_factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create_customer_dto";

export default class CustomerCreateUseCase {

    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(input.name, input.address.street, input.address.number, input.address.zip, input.address.city)
        await this.customerRepository.create(customer)
        return {
            id: customer.getId(),
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }
    }
}