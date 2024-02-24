import { app, sequelize } from "../../express"
import request from "supertest"

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "A",
                name: "Product A",
                price: 10
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product A")
        expect(response.body.price).toBe(10)
    })

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "A",
                name: "Product A",
                price: 10
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product A")
        expect(response.body.price).toBe(10)
        const response2 = await request(app)
            .post("/product")
            .send({
                type: "B",
                name: "Product B",
                price: 50
            })
        expect(response2.status).toBe(200)
        expect(response2.body.name).toBe("Product B")
        expect(response2.body.price).toBe(100)
        const listResponse = await request(app).get("/product").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)
        const productA = listResponse.body.products[0]
        expect(productA.name).toBe("Product A")
        expect(productA.price).toBe(10)
        const productB = listResponse.body.products[1]
        expect(productB.name).toBe("Product B")
        expect(productB.price).toBe(100)
        const listResponseXML = await request(app).get("/product").set("Accept", "application/xml").send()
        expect(listResponseXML.status).toBe(200)
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(listResponseXML.text).toContain(`<products>`)
        expect(listResponseXML.text).toContain(`<product>`)
        expect(listResponseXML.text).toContain(`<name>Product A</name>`)
        expect(listResponseXML.text).toContain(`<price>10</price>`)
        expect(listResponseXML.text).toContain(`</product>`)
        expect(listResponseXML.text).toContain(`<product>`)
        expect(listResponseXML.text).toContain(`<name>Product B</name>`)
        expect(listResponseXML.text).toContain(`<price>100</price>`)
        expect(listResponseXML.text).toContain(`</product>`)
        expect(listResponseXML.text).toContain(`</products>`)
    })

})