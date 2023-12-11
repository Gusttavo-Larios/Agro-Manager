import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(AuthGuard)
@Controller('farmer')
export class FarmerController {
  constructor(
    private readonly farmerService: FarmerService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() createFarmerDto: CreateFarmerDto,
    @Request() request: any,
  ) {
    const [_, token] = request.headers.authorization.split(' ');
    const { sub } = await this.authService.getDataFromToken(token);
    createFarmerDto.created_by = sub;
    
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(Number(id), updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }
}
