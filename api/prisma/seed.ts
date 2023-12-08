import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    await prisma.administrator.deleteMany()
    await prisma.state.deleteMany()
    
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

    const responseStates = await prisma.state.createMany({
        data: [
            { "state_name": "Acre", "acronym": "AC" },
            { "state_name": "Alagoas", "acronym": "AL" },
            { "state_name": "Amapá", "acronym": "AP" },
            { "state_name": "Amazonas", "acronym": "AM" },
            { "state_name": "Bahia", "acronym": "BA" },
            { "state_name": "Ceará", "acronym": "CE" },
            { "state_name": "Distrito Federal", "acronym": "DF" },
            { "state_name": "Espírito Santo", "acronym": "ES" },
            { "state_name": "Goiás", "acronym": "GO" },
            { "state_name": "Maranhão", "acronym": "MA" },
            { "state_name": "Mato Grosso", "acronym": "MT" },
            { "state_name": "Mato Grosso do Sul", "acronym": "MS" },
            { "state_name": "Minas Gerais", "acronym": "MG" },
            { "state_name": "Pará", "acronym": "PA" },
            { "state_name": "Paraíba", "acronym": "PB" },
            { "state_name": "Paraná", "acronym": "PR" },
            { "state_name": "Pernambuco", "acronym": "PE" },
            { "state_name": "Piauí", "acronym": "PI" },
            { "state_name": "Rio de Janeiro", "acronym": "RJ" },
            { "state_name": "Rio Grande do Norte", "acronym": "RN" },
            { "state_name": "Rio Grande do Sul", "acronym": "RS" },
            { "state_name": "Rondônia", "acronym": "RO" },
            { "state_name": "Roraima", "acronym": "RR" },
            { "state_name": "Santa Catarina", "acronym": "SC" },
            { "state_name": "São Paulo", "acronym": "SP" },
            { "state_name": "Sergipe", "acronym": "SE" },
            { "state_name": "Tocantins", "acronym": "TO" }
        ]
    })

    console.log({ response, responseStates })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async e => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})