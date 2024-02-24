import ProductRepositoryInterface from "../../../domain/product/repository/product_repository_interface"
import { InputFindProductDto, OutputFindProductDto } from "./find_product_dto"

export default class FindProductUseCase {

    private productRepository: ProductRepositoryInterface
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input.id)
        return {
            id: product.getId(),
            name: product.name,
            price: product.price
        }
    }

}