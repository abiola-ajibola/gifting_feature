import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GiftModule } from './gift/gift.module';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { dataSourceOptions } from './dataSource';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions),
    UserModule,
    GiftModule,
    PropertyModule,
  ],
})
export class AppModule {}
