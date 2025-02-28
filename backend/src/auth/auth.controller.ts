import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Public } from './decorators/public.decorators';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return { token: token.token, user };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() createUser: CreateUserDto) {
    try {
      const user = await this.userService.create(createUser);
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const payload = { email: user.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      return { token, user };
    } catch (e) {
      const error = e as Error;
      console.log({ error });
      return new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('me')
  async getMe(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    const { email } = this.jwtService.decode<{ email: string; sub: number }>(
      token,
    );
    return await this.userService.findOneByEmail(email);
  }
}
