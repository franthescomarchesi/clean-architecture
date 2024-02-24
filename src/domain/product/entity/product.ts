import ProductInterface from "./product_iterface";

export default class Product implements ProductInterface {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this.validadeId();
        this._name = name;
        this.validadeName();
        this._price = price;
        this.validadePrice();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validadeName();
    }

    changePrice(price: number) {
        this._price = price;
        this.validadePrice();
    }

    validadeId() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }

    validadeName() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    validadePrice() {
        if (this._price < 0) {
            throw new Error("Price must be greater than zero");
        }
    }

}