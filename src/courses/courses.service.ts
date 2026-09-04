import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/course-create.dto';
import { UpdateCourseDto } from './dto/course-update.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: { tags: true } });
  }

  async findOne(id: string): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({
      where: { id: id },
      relations: { tags: true },
    });

    if (!existingCourse) {
      throw new NotFoundException(`Curso com o ID ${id} não encontrado`);
    }

    return existingCourse;
  }

  async create(course: CreateCourseDto): Promise<Course> {
    const tags = await Promise.all(
      course.tags.map((tag: { name: string }) =>
        this.preloadTagByName(tag.name),
      ),
    );

    const newCourse = this.courseRepository.create({
      ...course,
      tags,
    });

    return this.courseRepository.save(newCourse);
  }

  async update(
    id: string,
    updatedCourse: Partial<UpdateCourseDto>,
  ): Promise<Course> {
    const courseToUpdate: Partial<Course> = {
      id: id,
    };

    if (updatedCourse.name) {
      courseToUpdate.name = updatedCourse.name;
    }

    if (updatedCourse.description !== undefined) {
      courseToUpdate.description = updatedCourse.description;
    }

    if (updatedCourse.tags) {
      courseToUpdate.tags = await Promise.all(
        updatedCourse.tags.map((tag: { name: string }) =>
          this.preloadTagByName(tag.name),
        ),
      );
    }

    const course = await this.courseRepository.preload(courseToUpdate);

    if (!course) {
      throw new NotFoundException(`Curso com o ID ${id} não encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const existingCourse = await this.findOne(id);

    await this.courseRepository.remove(existingCourse);

    return {
      message: `Curso com o ID ${id} foi removido com sucesso`,
      code_status: 200,
    };
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const normalizedName = name.trim();

    const tag = await this.tagRepository.findOne({
      where: { name: normalizedName },
    });

    if (!tag) {
      return this.tagRepository.save(
        this.tagRepository.create({ name: normalizedName }),
      );
    }

    return tag;
  }
}
