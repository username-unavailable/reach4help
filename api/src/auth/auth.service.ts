import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateAuth(authDto: CreateAuthDto): Promise<any> {
    return "fe";
    //const user = await this.usersService.findOne(id);
    if (authDto && authDto.accessToken === "") {
      //const { firstName, ...result } = user;
      return authDto;
    }
    return null;
  }

  async authenticate(authDto: CreateAuthDto) {
    const payload = { username: authDto.accessToken, sub: authDto.idP };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
