import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@api/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    console.log({ moduleFixture });
    app = moduleFixture.createNestApplication();
    await app.init();
    console.log({ userService: app.get('UserService') });
  });

  it('/ (GET) should return welcome message', () => {
    console.log({ app });
    return app.get('/').expect(200).expect('Hello World!');
  });
});
