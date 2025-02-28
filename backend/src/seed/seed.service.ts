import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Property } from '../property/entities/property.entity';
import { Gift } from '../gift/entities/gift.entity';
import { users } from './data/users';
import { properties } from './data/properties';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}

  async seed() {
    const _users = await Promise.all(
      users.map(async (user) => {
        const newUser = new User();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.password = user.password;

        return await this.userRepository.save(newUser);
      }),
    );

    console.dir({ _users }, { depth: 5 });

    const _properties = await Promise.all(
      properties.map(async (propertyData) => {
        const property = new Property();
        property.title = propertyData.title;
        property.description = propertyData.description;
        property.imageUrl = propertyData.imageUrl;
        property.price = propertyData.price;
        property.location = propertyData.location;
        property.isAvailable = propertyData.isAvailable;

        return await this.propertyRepository.save(property);
      }),
    );

    const _gifts = await Promise.all(
      Array.from({ length: 8 }).map(async () => {
        const gift = new Gift();
        const giver = _users[Math.floor(Math.random() * _users.length)];
        const receiver = _users[Math.floor(Math.random() * _users.length)];
        const property =
          _properties[Math.floor(Math.random() * _properties.length)];
        gift.receiverEmail = receiver.email;
        gift.giverId = giver.id;
        gift.propertyId = property.id;

        return this.giftRepository.save(gift);
      }),
    );

    await new Promise((resolve) => {
      console.log('Seeding Complete!!!\n', {
        _users: _users.length,
        _properties: _properties.length,
        _gifts: _gifts.length,
      });
      resolve({
        _users: _users.length,
        _properties: _properties.length,
        _gifts: _gifts.length,
      });
    });
  }
}
