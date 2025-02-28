import { Injectable } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gift } from './entities/gift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}
  async create(createGiftDto: CreateGiftDto) {
    return {
      ...(await this.giftRepository.save(createGiftDto)),
      receiver: { ...createGiftDto.receiver, password: undefined },
    };
  }

  async findAll(id: number, email: string) {
    return this.giftRepository.find({
      where: [{ receiverEmail: email }, { giverId: id }],
      relations: ['giver', 'receiver', 'property'],
      select: {
        giver: {
          id: true,
          username: true,
          email: true,
          firstname: true,
          lastname: true,
        },
        receiver: {
          id: true,
          username: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.giftRepository.findOne({
      where: { id },
      relations: ['giver', 'receiver', 'property'],
      select: {
        giver: {
          id: true,
          username: true,
          email: true,
          firstname: true,
          lastname: true,
        },
        receiver: {
          id: true,
          username: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    });
  }

  update(id: number, updateGiftDto: UpdateGiftDto) {
    return this.giftRepository.update(id, updateGiftDto);
  }

  remove(id: number) {
    return this.giftRepository.delete(id);
  }
}
