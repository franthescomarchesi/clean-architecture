import Order from "../order";
import OrderItem from "../order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("","123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("123","", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            const order = new Order("123","123", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        let order = new Order("o1", "c1", [item1]);
        let total = order.total();
        expect(total).toBe(200);
        order = new Order("o1", "c1", [item1, item2]);
        total = order.total();
        expect(total).toBe(600);
    });

});