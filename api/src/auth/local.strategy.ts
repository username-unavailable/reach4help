import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(authDto: CreateAuthDto): Promise<any> {
    console.log("validate");
    const user = await this.authService.validateAuth(authDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}