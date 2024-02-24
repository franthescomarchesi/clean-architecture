import Entity from "../../shared/entity/entity_abstract";
import CustomerValidatorFactory from "../factory/customer_validator_fatory";
import Address from "../value_object/address";
import CustomerInterface from "./customer_interface";

export default class Customer extends Entity implements CustomerInterface {

    protected CONTEXT = "customer"

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this._name = name;
        this.validate();
        super.hasErrors()
    }

    getId(): string {
        return this.id
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set rewardPoints(rewardPoints: number) {
        this._rewardPoints = rewardPoints;
    }

    get address(): Address{
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
        super.hasErrors();
    }

    activate() {
        if (this._address === undefined) {
            this.addError("Address is mandatory to activate a customer")
            super.hasErrors();
        }
        this._active = true;
    }

    isActive() {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }

    addRewardsPoints(points: number) {
        this._rewardPoints += points;
    }

}