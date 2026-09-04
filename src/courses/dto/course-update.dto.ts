import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './course-create.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
