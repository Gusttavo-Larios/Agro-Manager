import { PrismaService } from "src/prisma.service";
import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FarmerRepository {
    constructor(private prisma: PrismaService) { }

    async create(createFarmerDto: CreateFarmerDto) {
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

}