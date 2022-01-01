import { Test, TestingModule } from '@nestjs/testing';
import { AvaragesController } from './avarages.controller';

describe('AvaragesController', () => {
    let controller: AvaragesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AvaragesController]
        }).compile();

        controller = module.get<AvaragesController>(AvaragesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
