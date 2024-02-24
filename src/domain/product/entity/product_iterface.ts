export default interface ProductInterface{

    get id(): string;
    get name(): string;
    changeName(name: string): void;
    get price(): number;
    changePrice(price: number): void;

}