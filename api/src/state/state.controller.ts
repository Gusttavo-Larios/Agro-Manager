import { Controller, Get, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.stateService.findAll();
  }
}
