import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createCityDto: CreateCityDto) {
  //   return this.cityService.create(createCityDto);
  // }

  // @Get()
  // findAll() {
  //   return this.cityService.findAll();
  // }

  @Get('service/:acronym')
  @UseGuards(AuthGuard)
  findOne(@Param('acronym') acronym: string) {
    return this.cityService.consultService(acronym);
  }
}
