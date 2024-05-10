import { Test, TestingModule } from '@nestjs/testing';
import { ApplyStatusLogService } from './apply-status-log.service';

describe('ApplyStatusLogService', () => {
  let service: ApplyStatusLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyStatusLogService],
    }).compile();

    service = module.get<ApplyStatusLogService>(ApplyStatusLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
