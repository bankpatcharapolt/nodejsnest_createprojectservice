import { Test, TestingModule } from '@nestjs/testing';
import { SolarProjectRelateSiteService } from './solarprojectrelatesiteservice.service';

describe('SolarProjectRelateSiteService', () => {
  let service: SolarProjectRelateSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolarProjectRelateSiteService],
    }).compile();

    service = module.get<SolarProjectRelateSiteService>(SolarProjectRelateSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
