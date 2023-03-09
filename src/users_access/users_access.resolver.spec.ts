import { Test, TestingModule } from '@nestjs/testing';
import { UsersAccessResolver } from './users_access.resolver';
import { UsersAccessService } from './users_access.service';

describe('UsersAccessResolver', () => {
  let resolver: UsersAccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAccessResolver, UsersAccessService],
    }).compile();

    resolver = module.get<UsersAccessResolver>(UsersAccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
