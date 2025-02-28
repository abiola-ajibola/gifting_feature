import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Property } from '../property/entities/property.entity';
import { Gift } from '../gift/entities/gift.entity';
import { SeedService } from './seed.service';
import { dataSourceOptions } from 'src/dataSource';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User, Property, Gift]),
  ],
  providers: [SeedService, Logger],
})
export class SeedModule {}
