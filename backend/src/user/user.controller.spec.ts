import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // const userController = app.get(UserController);
      // expect(userController.getHello()).toBe('Hello World!');
    });
  });
});
