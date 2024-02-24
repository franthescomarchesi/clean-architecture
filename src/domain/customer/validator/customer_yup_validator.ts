import ValidatorInterface from "../../shared/validator/validator_interface";
import CustomerInterface from "../entity/customer_interface";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<CustomerInterface>{

    validate(entity: CustomerInterface): void {
        try {

            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required")
            })
            .validateSync(
                {
                    id: entity.getId(),
                    name: entity.name
                }, {
                    abortEarly: false
                }
            )

        } catch(errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach((error) => {
                entity.getNotification().addError({
                    context: "customer",
                    message: error
                })
            })
        }
    }

}