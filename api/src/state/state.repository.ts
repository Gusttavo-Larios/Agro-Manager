import { Injectable } from "@nestjs/common";
import { State } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StateRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<State[]> {
        return this.prisma.state.findMany()
    }
}