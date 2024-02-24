import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/sequelize/model/customer_model";
import OrderItemModel from "./order_item_model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => require('./order_item_model').default)
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;

}