/// <reference types="jest" />
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: {
    find: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    preload: jest.Mock;
    remove: jest.Mock;
  };
  let tagRepository: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    courseRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    tagRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: courseRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: tagRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all courses with tags', async () => {
    const courses = [{ id: 1, name: 'NestJS', tags: [] }];
    courseRepository.find.mockResolvedValue(courses);

    await expect(service.findAll()).resolves.toEqual(courses);
    expect(courseRepository.find).toHaveBeenCalledWith({
      relations: { tags: true },
    });
  });

  it('should return one course by id', async () => {
    const course = { id: 1, name: 'NestJS', description: 'desc', tags: [] };
    courseRepository.findOne.mockResolvedValue(course);

    await expect(service.findOne('1')).resolves.toEqual(course);
    expect(courseRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: { tags: true },
    });
  });

  it('should throw NotFoundException when course is not found', async () => {
    courseRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a course and resolve tags', async () => {
    const courseData = {
      name: 'NestJS',
      description: 'desc',
      tags: [{ name: 'backend' }],
    };
    const tag = { id: 1, name: 'backend', courses: [] };
    const savedCourse = { id: 1, ...courseData, tags: [tag] };

    tagRepository.findOne.mockResolvedValue(tag);
    courseRepository.create.mockReturnValue(savedCourse);
    courseRepository.save.mockResolvedValue(savedCourse);

    await expect(service.create(courseData)).resolves.toEqual(savedCourse);
    expect(tagRepository.findOne).toHaveBeenCalledWith({
      where: { name: 'backend' },
    });
    expect(courseRepository.create).toHaveBeenCalledWith({
      ...courseData,
      tags: [tag],
    });
  });

  it('should update a course without tags in payload', async () => {
    const updatedCourse = { id: 1, name: 'Curso atualizado', tags: [] };
    courseRepository.preload.mockResolvedValue(updatedCourse);
    courseRepository.save.mockResolvedValue(updatedCourse);

    await service.update('1', { name: 'Curso atualizado' });

    expect(courseRepository.preload).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Curso atualizado',
      }),
    );
    expect(courseRepository.preload.mock.calls[0][0]).not.toHaveProperty(
      'tags',
    );
  });

  it('should remove a course and return success message', async () => {
    const existingCourse = { id: 1, name: 'NestJS', tags: [] };
    courseRepository.findOne.mockResolvedValue(existingCourse);
    courseRepository.remove.mockResolvedValue(undefined);

    await expect(service.remove('1')).resolves.toEqual({
      message: 'Curso com o ID 1 foi removido com sucesso',
      code_status: 200,
    });
    expect(courseRepository.remove).toHaveBeenCalledWith(existingCourse);
  });
});
