import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateRepository } from './state.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StateController],
  providers: [StateService, StateRepository, PrismaService],
  // imports: [],
  // exports: []
})

export class StateModule {}
