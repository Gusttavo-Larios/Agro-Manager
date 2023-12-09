import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { getFarmersData, statesData } from "./data"

const prisma = new PrismaClient()

async function main() {
    await prisma.administrator.deleteMany()
    await prisma.state.deleteMany()
    await prisma.farmer.deleteMany()

    const encryptedPassword = await bcrypt.hash('12345', 10);
    const administrator = await prisma.administrator.create({
        data:
        {
            name: "Aldair",
            email: "aldair.gomes@attosementes.com.br",
            password: encryptedPassword
        }
    })

    await prisma.administrator.create({
        data:
        {
            name: "Marco",
            email: "marco.antonio@attosementes.com.br",
            password: encryptedPassword
        }
    })

    await prisma.state.createMany({
        data: statesData
    })

    const city = await prisma.city.create({
        data: {
            city_name: "SAO PAULO",
            ibge_code: "3550308",
            state: {
                connect: {
                    state_name: "São Paulo"
                }
            }
        }
    })

    await prisma.farmer.createMany({
        data: getFarmersData(city.id, administrator.id)
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async e => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})