import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
import Any = jasmine.Any;

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Authenticate user' })
  async authenticate(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    console.log("authenticate");
    return this.authService.authenticate(createAuthDto);
  }
}