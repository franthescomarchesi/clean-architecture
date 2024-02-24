export interface InputListProductsDto {}

export interface OutputProductsDto {
    id: string
    name: string
    price: number
}

export interface OutputListProductsDto {
    products: OutputProductsDto[]
}