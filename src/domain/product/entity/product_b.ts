import Entity from "../../shared/entity/entity_abstract";
import ProductValidatorFactory from "../factory/product_validator_factory";
import ProductInterface from "./product_interface";

export default class ProductB extends Entity implements ProductInterface {

    protected CONTEXT = "product"

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super()
        this.id = id;
        this._name = name;
        this._price = price;
        this.validate()
        super.hasErrors()
    }

    getId(): string {
        return this.id
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price * 2;
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
        super.hasErrors()
    }

    changePrice(price: number) {
        this._price = price;
        this.validate()
        super.hasErrors()
    }

    validate() {
        ProductValidatorFactory.create().validate(this)
    }

}