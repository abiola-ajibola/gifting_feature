import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('gifts')
export class GiftController {
  constructor(
    private readonly giftService: GiftService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createGiftDto: CreateGiftDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { receiverEmail } = createGiftDto;
    const receiver = await this.userService.findOneByEmail(receiverEmail);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    return this.giftService.create({
      ...createGiftDto,
      receiver,
    });
  }

  @Get()
  async findAll(@Headers('authorization') token: string) {
    console.log(token);
    const tokenArray = token.split(' ');
    const userData = this.jwtService.verify<{ email: string }>(tokenArray[1]);
    console.log(userData);
    const email = userData.email;
    const user = await this.userService.findOneByEmail(email);
    return this.giftService.findAll(user.id, user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftService.update(+id, updateGiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftService.remove(+id);
  }
}
