import ValidatorInterface from "../../shared/validator/validator_interface";
import CustomerInterface from "../entity/customer_interface";
import CustomerYupValidator from "../validator/customer_yup_validator";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<CustomerInterface> {
        return new CustomerYupValidator()
    }
}