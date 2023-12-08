import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const encryptedPassword = await bcrypt.hash('12345', 10);

    const response = await prisma.administrator.createMany({
        data: [
            {
                name: "Aldair",
                email: "aldair.gomes@attosementes.com.br",
                password: encryptedPassword
            },
            {
                name: "Marco",
                email: "marco.antonio@attosementes.com.br",
                password: encryptedPassword
            }
        ]
    })

    console.log({ response })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async e => {
    await prisma.$disconnect()
    process.exit(1)
})