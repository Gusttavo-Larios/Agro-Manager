import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { Farmer } from "./entities/farmer.entity";

@Injectable()
export class FarmerRepository {
    constructor(private prisma: PrismaService) { }

    async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
        return await this.prisma.farmer.create({
            data: {
                corporate_name: createFarmerDto.corporate_name,
                fantasy_name: createFarmerDto.fantasy_name,
                company_identification: createFarmerDto.company_identification,
                phone_number: createFarmerDto.phone_number,
                city: {
                    connectOrCreate: {
                        where: {
                            ibge_code: createFarmerDto.city.ibge_code
                        },
                        create: {
                            city_name: createFarmerDto.city.city_name,
                            ibge_code: createFarmerDto.city.ibge_code,
                            state: {
                                connect: {
                                    id: createFarmerDto.city.state_id
                                }
                            }
                        }
                    }
                },
                createdBy: {
                    connect: {
                        id: createFarmerDto.created_by
                    }
                }
            }
        })
    }

    async findAll(page?: number): Promise<Farmer[]> {
        let numberOfIgnoredItems = 0;

        if (page > 1) numberOfIgnoredItems = 10 * (page - 1)

        return await this.prisma.farmer.findMany({
            skip: numberOfIgnoredItems,
            take: 10,
            orderBy: {
                id: 'asc'
            }
        })
    }


    async findOne(id: number): Promise<Farmer | null> {
        return await this.prisma.farmer.findUnique({
            where: {
                id
            }
        })
    }
}