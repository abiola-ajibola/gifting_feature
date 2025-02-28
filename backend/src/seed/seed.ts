import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed.service';
import { SeedModule } from './seed.module';
import { Logger } from '@nestjs/common';

async function seed() {
  const appCotext = await NestFactory.createApplicationContext(SeedModule);
  const seeder = appCotext.get(SeedService);
  const logger = appCotext.get(Logger);
  try {
    await seeder.seed();
    logger.debug('Seeding complete!');
  } catch (error) {
    logger.error('Seeding failed!', error);
  } finally {
    await appCotext.close();
  }
}

void seed();
