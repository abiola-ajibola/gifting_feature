import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('No user found with this email');
    }
    if (!(await compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUserDto) {
    try {
      const user = await this.usersService.create(data);
      const payload = { email: user.email, sub: user.id };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      console.error({ error: e as Error });
      throw new HttpException(
        'InternalServer Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
