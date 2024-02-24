import express, {Request, Response} from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create_customer_usecase";
import CustomerRepository from "../../customer/sequelize/repository/customer_repository";
import CustomerListUseCase from "../../../usecase/customer/list/list_customer_usecase";
import CustomerPresenter from "../presenters/customer_presenter";

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CustomerCreateUseCase(new CustomerRepository())
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }
        const output = await useCase.execute(customerDto)
        res.send(output)
    } catch (err){
        res.status(500).send(err)
    }
})

customerRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new CustomerListUseCase(new CustomerRepository())
    const output = await useCase.execute({})
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenter.listXML(output))
    })
})