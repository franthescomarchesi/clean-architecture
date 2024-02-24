export default class Address {
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";
  
    constructor(street: string, number: number, zip: string, city: string) {
      this._street = street;
      this.validateStreet();
      this._number = number;
      this.validateNumber();
      this._zip = zip;
      this.validateZip();
      this._city = city;
      this.validateCity();
    }
  
    get street(): string {
      return this._street;
    }
  
    get number(): number {
      return this._number;
    }
  
    get zip(): string {
      return this._zip;
    }
  
    get city(): string {
      return this._city;
    }

    toString() {
      return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
    
    validateStreet() {
      if (this._street.length === 0) {
        throw new Error("Street is required");
      }
    }

    validateNumber() {
      if (this._number === 0) {
        throw new Error("Number is required");
      }
    }

    validateZip() {
      if (this._zip.length === 0) {
        throw new Error("Zip is required");
      }
    }

    validateCity() {
      if (this._city.length === 0) {
        throw new Error("City is required");
      }
    }
  }