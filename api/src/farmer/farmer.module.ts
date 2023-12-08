import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { PrismaService } from 'src/prisma.service';
import { FarmerRepository } from './farmer.repository';

@Module({
  controllers: [FarmerController],
  providers: [FarmerService, PrismaService, FarmerRepository],
})
export class FarmerModule {}
