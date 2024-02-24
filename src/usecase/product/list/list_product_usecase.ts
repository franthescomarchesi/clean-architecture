import ProductRepositoryInterface from "../../../domain/product/repository/product_repository_interface"
import { InputListProductsDto, OutputListProductsDto } from "./list_product_dto"

export default class ListProductUseCase {

    private productRepository: ProductRepositoryInterface
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
        const result = await this.productRepository.findAll()
        return {
            products: result.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }

}