import { Injectable } from '@nestjs/common';
import { AdministratorsRepository } from './administrator.repository';

type Administrator = {
    id?: number,
    name: string,
    email: string,
    password: string
}

@Injectable()
export class AdministratorsService {
    constructor(private repository: AdministratorsRepository) { }

    async findOne(email: string): Promise<Administrator | undefined> {
        return this.repository.findOne(email)
    }
}
