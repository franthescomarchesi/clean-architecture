import ProductFactory from "../product_factory";

describe("Product factory unit tests", () => {

    it("should create a product type A", () => {
        const product = ProductFactory.create("A", "Product A", 1);
        expect(product.getId()).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type B", () => {
        const product = ProductFactory.create("B", "Product B", 1);
        expect(product.getId()).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error when product type is not supported", () => {
        expect(() => ProductFactory.create("C", "Product C", 1)).toThrowError("Product not supported.");
    });

});