import { Prisma } from '@prisma/client';
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmerRepository {
  constructor(private prisma: PrismaService) {}

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
                ibge_code: createFarmerDto.city.ibge_code,
              },
              create: {
                city_name: createFarmerDto.city.city_name,
                ibge_code: createFarmerDto.city.ibge_code,
                state: {
                  connect: {
                    acronym: createFarmerDto.city.state_acronym,
                  },
                },
              },
            },
          },
          createdBy: {
            connect: {
              id: createFarmerDto.created_by,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prisma.handlePrismaError(error);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(page: number = 1): Promise<{
    data: Farmer[];
    currentPage: number;
    totalPages: number;
  }> {
    try {
      let numberOfIgnoredItems = 0;

      if (page > 1) numberOfIgnoredItems = 10 * (page - 1);

      const response = await this.prisma.farmer.findMany({
        skip: numberOfIgnoredItems,
        take: 10,
        orderBy: {
          id: 'asc',
        },
        include: {
          city: {
            include: {
              state: true,
            },
          },
        },
      });

      const totalPages = await this.prisma.farmer.count();

      return {
        data: response,
        currentPage: page || 1,
        totalPages: Math.ceil(totalPages / 10),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prisma.handlePrismaError(error);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<Farmer | null> {
    try {
      return await this.prisma.farmer.findUnique({
        where: {
          id,
        },
        include: {
          city: {
            include: {
              state: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prisma.handlePrismaError(error);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    try {
      return await this.prisma.farmer.update({
        where: {
          id,
        },
        data: {
          corporate_name: updateFarmerDto.corporate_name,
          fantasy_name: updateFarmerDto.fantasy_name,
          company_identification: updateFarmerDto.company_identification,
          phone_number: updateFarmerDto.phone_number,
          city: {
            connectOrCreate: {
              where: {
                ibge_code: updateFarmerDto.city.ibge_code,
              },
              create: {
                city_name: updateFarmerDto.city.city_name,
                ibge_code: updateFarmerDto.city.ibge_code,
                state: {
                  connect: {
                    acronym: updateFarmerDto.city.state_acronym,
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prisma.handlePrismaError(error);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<Farmer | null> {
    try {
      return await this.prisma.farmer.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prisma.handlePrismaError(error);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
