import { Injectable } from '@nestjs/common';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
  constructor(private stateRepository: StateRepository) {}

  findAll() {
    return this.stateRepository.findAll();
  }
}
