import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order_repository_interface";
import OrderItemModel from "../model/order_item_model";
import OrderModel from "../model/order_model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        const orderItemModel = await OrderItemModel.findAll({
            where: {
                orderId: entity.id
            }
        });
        entity.items.forEach(item => {
            if (orderItemModel.some(e => e.id === item.id)) {
                OrderItemModel.update({
                    name: item.name,
                    price: item.price,
                    productId: item.productId,
                    quantity: item.quantity
                }, {
                    where: {
                        id: item.id
                    }
                });
                return;
            }
            OrderItemModel.create({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                orderId: entity.id
            });
        });
        await OrderModel.update({
            customerId: entity.customerId,
            total: entity.total()
        }, {
            where: {
                id: entity.id
            }
        }); 
    }

    async find(id: string): Promise<Order> {
        const orderItemModel = await OrderItemModel.findAll({
            where: {
                orderId: id
            }
        })
        const orderModel = await OrderModel.findOne({
            where: {
                id: id
            }
        });
        return new Order(
            orderModel.id,
            orderModel.customerId,
            orderItemModel.map(item => {
                return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
            })
        );
    }

    async findAll(): Promise<Order[]> {
        const orderItemModel = await OrderItemModel.findAll();
        const orderModel = await OrderModel.findAll();
        const orders:Order[] = []
        let itens:OrderItem[] = [];
        orderModel.forEach(order => {
            orderItemModel.forEach(item => {
                if (order.id === item.orderId) {
                    itens.push(new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
                }
            })
            orders.push(new Order(order.id, order.customerId, itens))
            itens = [];
        })
        return orders;
    }

}