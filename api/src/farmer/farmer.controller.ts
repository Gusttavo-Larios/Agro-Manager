import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.create(createFarmerDto);
  }

  @Get()
  findAll(@Query('page') page: string) {
    return this.farmerService.findAll(Number(page));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(Number(id));
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
  //   return this.farmerService.update(+id, updateFarmerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.farmerService.remove(+id);
  // }
}
