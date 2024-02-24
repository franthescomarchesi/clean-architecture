import ValidatorInterface from "../../shared/validator/validator_interface";
import ProductInterface from "../entity/product_interface";
import ProductYupValidator from "../validator/product_yup_validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<ProductInterface> {
        return new ProductYupValidator()
    }
}