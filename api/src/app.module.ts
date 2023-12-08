import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdministratorsService } from './administrators/administrators.service';
import { AdministratorsModule } from './administrators/administrators.module';
import { PrismaService } from './prisma.service';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    AuthModule,
    AdministratorsModule,
    StateModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, AdministratorsService],
})

export class AppModule {

}