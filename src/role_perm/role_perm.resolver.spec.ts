import { Test, TestingModule } from '@nestjs/testing';
import { RolePermResolver } from './role_perm.resolver';
import { RolePermService } from './role_perm.service';

describe('RolePermResolver', () => {
  let resolver: RolePermResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermResolver, RolePermService],
    }).compile();

    resolver = module.get<RolePermResolver>(RolePermResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
