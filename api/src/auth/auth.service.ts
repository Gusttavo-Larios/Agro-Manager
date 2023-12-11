import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdministratorsRepository } from 'src/administrators/administrator.repository';

@Injectable()
export class AuthService {
  constructor(
    private administratorRepository: AdministratorsRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.administratorRepository.findOne(email);

    if (!user || !bcrypt.compare(pass, user?.password)) {
      throw new UnauthorizedException('Usuário ou senha está incorreto.');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getDataFromToken(token: string): Promise<{
    sub: number;
    email: string;
    iat: number;
    exp: number;
  }> {
    return this.jwtService.decode(token);
  }
}
