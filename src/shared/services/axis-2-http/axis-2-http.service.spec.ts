import { Test, TestingModule } from '@nestjs/testing';
import { Axis2HttpService } from './axis-2-http.service';

describe('Axis2HttpService', () => {
  let service: Axis2HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Axis2HttpService],
    }).compile();

    service = module.get<Axis2HttpService>(Axis2HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
