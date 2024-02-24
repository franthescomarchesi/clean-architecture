import { app, sequelize } from "../express";
import request from "supertest"

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "zip"
                }
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("John")
        expect(response.body.address.street).toBe("street")
        expect(response.body.address.city).toBe("city")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("zip")
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John"
            })
            expect(response.status).toBe(500)
    })

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "customer 01",
                address: {
                    street: "street 01",
                    city: "city 01",
                    number: 1,
                    zip: "zip 01"
                }
            })
        expect(response.status).toBe(200)
        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "customer 02",
                address: {
                    street: "street 02",
                    city: "city 02",
                    number: 2,
                    zip: "zip 02"
                }
            })
        expect(response2.status).toBe(200)
        const listResponse = await request(app).get("/customer").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)
        const customer01 = listResponse.body.customers[0]
        expect(customer01.name).toBe("customer 01")
        expect(customer01.address.street).toBe("street 01")
        const customer02 = listResponse.body.customers[1]
        expect(customer02.name).toBe("customer 02")
        expect(customer02.address.street).toBe("street 02")
        const listResponseXML = await request(app).get("/customer").set("Accept", "application/xml").send()
        expect(listResponseXML.status).toBe(200)
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`)
        expect(listResponseXML.text).toContain(`<customer>`)
        expect(listResponseXML.text).toContain(`<name>customer 01</name>`)
        expect(listResponseXML.text).toContain(`<address>`)
        expect(listResponseXML.text).toContain(`<street>street 01</street>`)
        expect(listResponseXML.text).toContain(`<city>city 01</city>`)
        expect(listResponseXML.text).toContain(`<number>1</number>`)
        expect(listResponseXML.text).toContain(`<zip>zip 01</zip>`)
        expect(listResponseXML.text).toContain(`</address>`)
        expect(listResponseXML.text).toContain(`</customer>`)
        expect(listResponseXML.text).toContain(`<name>customer 02</name>`)
        expect(listResponseXML.text).toContain(`<street>street 02</street>`)
        expect(listResponseXML.text).toContain(`</customers>`)
    })

})