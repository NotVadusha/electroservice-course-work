import { Test, TestingModule } from '@nestjs/testing';
import { EmergenciesController } from './emergencies.controller';
import { EmergenciesService } from './emergencies.service';

describe('EmergenciesController', () => {
  let controller: EmergenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergenciesController],
      providers: [EmergenciesService],
    }).compile();

    controller = module.get<EmergenciesController>(EmergenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
