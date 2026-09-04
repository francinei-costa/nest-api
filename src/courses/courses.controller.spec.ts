/// <reference types="jest" />
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: jest.Mocked<CoursesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.findAll', () => {
    service.findAll.mockResolvedValue([]);

    expect(controller.findAll()).resolves.toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.create with dto', () => {
    const dto = {
      name: 'NestJS',
      description: 'desc',
      tags: [{ name: 'backend' }],
    };
    service.create.mockResolvedValue({
      id: 1,
      ...dto,
      tags: [{ id: 1, name: 'backend' }],
    });

    expect(controller.create(dto)).resolves.toEqual({
      id: 1,
      name: 'NestJS',
      description: 'desc',
      tags: [{ id: 1, name: 'backend' }],
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
