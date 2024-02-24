import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../customer/sequelize/model/customer_model";
import CustomerRepository from "../../../../customer/sequelize/repository/customer_repository";
import Customer from "../../../../../domain/customer/entity/customer";
import Address from "../../../../../domain/customer/value_object/address";
import OrderModel from "../../model/order_model";
import OrderItemModel from "../../model/order_item_model";
import ProductModel from "../../../../product/sequelize/model/product_model";
import ProductRepository from "../../../../product/sequelize/repository/product_repository";
import Product from "../../../../../domain/product/entity/product";
import OrderItem from "../../../../../domain/checkout/entity/order_item";
import Order from "../../../../../domain/checkout/entity/order";
import OrderRepository from "../order_repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const orderItem = new OrderItem(
            "1", 
            product.name,
            product.price,
            product.getId(),
            2
        );
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.getId(), [orderItem]);
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.getId(),
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    productId: orderItem.productId,
                    quantity: orderItem.quantity,
                    orderId: order.id
                }
            ]
        })
    });

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const orderItem = new OrderItem(
            "1", 
            product.name,
            product.price,
            product.getId(),
            2
        );
        const orderRepository = new OrderRepository();
        let order = new Order("1", customer.getId(), [orderItem]);
        await orderRepository.create(order);
        const customer2 = new Customer("2", "Customer 02");
        customer2.address = new Address("Street2", 9, "zip2", "city2");
        customer2.activate();
        await customerRepository.create(customer2);
        const product2 = new Product("2", "Product 2", 120);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "1", 
            product2.name,
            product2.price,
            product2.getId(),
            3
        );
        const orderItem3 = new OrderItem(
            "3", 
            product2.name,
            product2.price,
            product2.getId(),
            6
        );
        order = new Order("1", customer2.getId(), [orderItem2, orderItem3]);
        await orderRepository.update(order);
        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer2.getId(),
            total: order.total(),
            items: [
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    productId: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    orderId: order.id
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name,
                    price: orderItem3.price,
                    productId: orderItem3.productId,
                    quantity: orderItem3.quantity,
                    orderId: order.id
                }
            ]
        })
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const orderItem = new OrderItem(
            "1", 
            product.name,
            product.price,
            product.getId(),
            2
        );
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.getId(), [orderItem]);
        await orderRepository.create(order);
        const orderResult = await orderRepository.find(order.id);
        expect(order).toEqual(orderResult);
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 01");
        customer.address = new Address("Street", 8, "zip", "city");
        customer.activate();
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const orderItem = new OrderItem(
            "1", 
            product.name,
            product.price,
            product.getId(),
            2
        );
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.getId(), [orderItem]);
        await orderRepository.create(order);
        const customer2 = new Customer("2", "Customer 02");
        customer2.address = new Address("Street2", 9, "zip2", "city2");
        customer2.activate();
        await customerRepository.create(customer2);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "2", 
            product2.name,
            product2.price,
            product2.getId(),
            4
        );
        const order2 = new Order("2", customer2.getId(), [orderItem2]);
        await orderRepository.create(order2);
        const orders = [order, order2]
        const orderResult = await orderRepository.findAll();
        expect(orders).toEqual(orderResult);
    });

});