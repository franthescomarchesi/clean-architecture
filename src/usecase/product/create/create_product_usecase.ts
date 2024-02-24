import ProductFactory from "../../../domain/product/factory/product_factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product_repository_interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create_product_dto";

export default class CreateProductUsecase {

    private productRepository: ProductRepositoryInterface
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.type, input.name, input.price)
        await this.productRepository.create(product)
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

}