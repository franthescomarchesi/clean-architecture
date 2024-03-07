import Address from "../value_object/address";
import Notification from "../../shared/notification/notification";

export default interface CustomerInterface {

    getId(): string;
    get name(): string;
    get address(): Address;
    get rewardPoints(): number;
    set address(address: Address);
    changeName(name: string): void;
    getNotification(): Notification;
    isActive(): boolean;
}