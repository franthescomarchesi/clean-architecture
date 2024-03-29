import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product_interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product_repository_interface";
import ProductModel from "../model/product_model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: entity.getId(),
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: ProductInterface): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {    
            where: {
                id: entity.getId()
            }
        });
    }

    async find(id: string): Promise<ProductInterface> {
        const productModel = await ProductModel.findOne({
            where: {
                id: id
            }
        });
        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        )
    }
    
    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(productModel => 
            new Product(productModel.id, productModel.name, productModel.price)
        );
    }
    
}