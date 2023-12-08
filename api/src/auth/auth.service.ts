import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { AdministratorsRepository } from 'src/administrators/administrator.repository';

@Injectable()
export class AuthService {
    constructor(
        private administratorRepository: AdministratorsRepository,
        private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.administratorRepository.findOne(email);

        if (!bcrypt.compare(pass, user?.password)) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, email: user.email}

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
