import Product from "../product";

describe("Product unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Name", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "Name", -1);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change Name", () => {
        const product = new Product("123", "Name", 10);
        product.changeName("Product 1");
        expect(product.name).toBe("Product 1");
    });

    it("should change Price", () => {
        const product = new Product("123", "Name", 10);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});