import OrderItem from "../order_item";

describe("Order item unit tests", () => {

    it("should throw error if the item quantity is less of equal zero", () => {
        expect(() => {
            const item = new OrderItem("123", "Name", 100, "123", 0);
        }).toThrowError("Quantity must be greater than zero");
    });

});