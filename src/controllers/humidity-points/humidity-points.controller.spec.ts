import { Test, TestingModule } from '@nestjs/testing';
import { HumidityPointsController } from './humidity-points.controller';

describe('HumidityPointsController', () => {
  let controller: HumidityPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumidityPointsController],
    }).compile();

    controller = module.get<HumidityPointsController>(HumidityPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
