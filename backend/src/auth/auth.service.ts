import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';

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
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
