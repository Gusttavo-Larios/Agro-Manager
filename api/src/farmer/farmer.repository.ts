import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { Farmer } from "./entities/farmer.entity";
import { Prisma } from "@prisma/client";
import { UpdateFarmerDto } from "./dto/update-farmer.dto";

@Injectable()
export class FarmerRepository {
    constructor(private prisma: PrismaService) { }

    async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
        try {
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
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(error.message)
            }
            throw new InternalServerErrorException(error.message)
        }
    }

    async findAll(page?: number): Promise<Farmer[]> {
        let numberOfIgnoredItems = 0;

        if (page > 1) numberOfIgnoredItems = 10 * (page - 1)

        return await this.prisma.farmer.findMany({
            skip: numberOfIgnoredItems,
            take: 10,
            orderBy: {
                id: 'asc'
            },
            include: {
                city: {
                    include: {
                        state: true
                    }
                }
            }
        })
    }


    async findOne(id: number): Promise<Farmer | null> {
        return await this.prisma.farmer.findUnique({
            where: {
                id
            },
            include: {
                city: {
                    include: {
                        state: true
                    }
                }
            }
        })
    }

    async update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
        try {
            return await this.prisma.farmer.update({
                where: {
                    id
                },
                data: {
                    corporate_name: updateFarmerDto.corporate_name,
                    fantasy_name: updateFarmerDto.fantasy_name,
                    company_identification: updateFarmerDto.company_identification,
                    phone_number: updateFarmerDto.phone_number,
                    city: {
                        connectOrCreate: {
                            where: {
                                ibge_code: updateFarmerDto.city.ibge_code
                            },
                            create: {
                                city_name: updateFarmerDto.city.city_name,
                                ibge_code: updateFarmerDto.city.ibge_code,
                                state: {
                                    connect: {
                                        id: updateFarmerDto.city.state_id
                                    }
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(error.message)
            }
            throw new InternalServerErrorException(error.message)
        }
    }
}