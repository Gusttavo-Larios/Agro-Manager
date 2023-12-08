import { Module } from '@nestjs/common';
import { AdministratorsRepository } from './administrator.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [AdministratorsRepository, PrismaService],
    exports: [AdministratorsRepository]
})

export class AdministratorsModule {}
