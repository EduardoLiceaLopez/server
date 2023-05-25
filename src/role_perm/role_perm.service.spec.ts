import { Test, TestingModule } from '@nestjs/testing';
import { RolePermService } from './role_perm.service';

describe('RolePermService', () => {
  let service: RolePermService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermService],
    }).compile();

    service = module.get<RolePermService>(RolePermService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
