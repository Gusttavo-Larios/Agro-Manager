import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    handlePrismaError(error: PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                // handling duplicate key errors
                throw new BadRequestException(`Valor duplicado: ${error.meta.target}`);
            case 'P2014':
                // handling invalid id errors
                throw new BadRequestException(`Identificador inválido: ${error.meta.target}`);
            case 'P2003':
                // handling invalid data errors
                throw new BadRequestException(`Os dados informado são inválidos: ${error.meta.target}`);
            case 'P2025':
                // handling one or more records that were required but not found
                throw new BadRequestException(`O registro necessário não foi encontrado: ${error.meta.modelName}`);
            default:
                // handling all other errors
                throw new InternalServerErrorException(`Algo deu errado: ${error.message}`);
        }
    };
}