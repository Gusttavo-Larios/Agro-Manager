import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { PrismaService } from 'src/prisma.service';
import { FarmerRepository } from './farmer.repository';
import { AuthService } from 'src/auth/auth.service';
import { AdministratorsRepository } from 'src/administrators/administrator.repository';

@Module({
  controllers: [FarmerController],
  providers: [FarmerService, PrismaService, FarmerRepository, AuthService, AdministratorsRepository],
})
export class FarmerModule {}
