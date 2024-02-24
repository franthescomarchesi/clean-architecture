import express, {Request, Response} from "express";
import CreateProductUsecase from "../../../../usecase/product/create/create_product_usecase";
import ProductRepository from "../../../product/sequelize/repository/product_repository";
import ListProductUseCase from "../../../../usecase/product/list/list_product_usecase";
import ProductPresenter from "../presenters/product_presenter";

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository())
    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        }
        const output = await usecase.execute(productDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository())
    const output = await usecase.execute({})
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(ProductPresenter.listXML(output))
    })
})