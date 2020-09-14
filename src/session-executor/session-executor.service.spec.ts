import { Test, TestingModule } from '@nestjs/testing';
import { SessionExecutorService } from './session-executor.service';

describe('SessionExecutorService', () => {
  let service: SessionExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionExecutorService],
    }).compile();

    service = module.get<SessionExecutorService>(SessionExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
