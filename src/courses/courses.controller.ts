import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/course-create.dto';
import { UpdateCourseDto } from './dto/course-update.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('list')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() courseDto: CreateCourseDto) {
    return this.coursesService.create(courseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() courseDto: UpdateCourseDto) {
    return this.coursesService.update(id, courseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
