import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AdministratorsRepository {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<any> {
        return this.prisma.administrator.findUnique({
            where: {
                email
            }
        })
    }
}