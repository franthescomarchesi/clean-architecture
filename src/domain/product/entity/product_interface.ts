import Notification from "../../shared/notification/notification";

export default interface ProductInterface{

    getId(): string;
    get name(): string;
    changeName(name: string): void;
    get price(): number;
    changePrice(price: number): void;
    getNotification(): Notification;
}