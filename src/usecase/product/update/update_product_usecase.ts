import ProductRepositoryInterface from "../../../domain/product/repository/product_repository_interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update_product_dto";

export default class UpdateProductUseCase {

    private productRepository: ProductRepositoryInterface
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id)
        product.changeName(input.name)
        product.changePrice(input.price)
        await this.productRepository.update(product)
        return {
            id: product.getId(),
            name: product.name,
            price: product.price
        }
    }

}