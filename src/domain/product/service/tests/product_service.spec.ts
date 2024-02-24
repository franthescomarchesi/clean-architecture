import Product from "../../entity/product";
import ProductService from "../product_service";

describe("Product service unit tests", () => {

    it("should change the price of all products", () => {
        const product1 = new Product("product1", "Product 1", 10);
        const product2 = new Product("product2", "Product 2", 20);
        const products = [product1, product2];
        ProductService.increasePrice(products, 30);
        expect(product1.price).toBe(13);
        expect(product2.price).toBe(26);
    });

});