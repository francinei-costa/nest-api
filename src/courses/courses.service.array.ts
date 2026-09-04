// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Course } from './entities/course.entity';
// import { CreateCourseDto } from './dto/course-create.dto';
// import { UpdateCourseDto } from './dto/course-update.dto';
// @Injectable()
// export class CoursesServiceArray {
//   private courses: Course[] = [
//     // {
//     //   id: 1,
//     //   name: 'Course 1',
//     //   description: 'Description of Course 1',
//     //   tags: ['tag1', 'tag2'],
//     // },
//     // {
//     //   id: 2,
//     //   name: 'Course 2',
//     //   description: 'Description of Course 2',
//     //   tags: ['tag3', 'tag4'],
//     // },
//     // {
//     //   id: 3,
//     //   name: 'Course 3',
//     //   description: 'Description of Course 3',
//     //   tags: ['tag5', 'tag6'],
//     // },
//   ];

//   findAll(): Course[] {
//     return this.courses;
//   }

//   findOne(id: string): Course | undefined {
//     const existingCourse = this.courses.find(
//       (course: Course) => course.id === Number(id),
//     );
//     if (!existingCourse) {
//       throw new HttpException(
//         `Curso com o ID ${id} não encontrado`,
//         HttpStatus.NOT_FOUND,
//       );
//     }
//     return existingCourse;
//   }

//   create(course: CreateCourseDto): Course {
//     const newCourse = { ...course, id: this.courses.length + 1 } as Course;
//     this.courses.push(newCourse);
//     return newCourse;
//   }

//   update_(id: string, updatedCourse: Partial<UpdateCourseDto>) {
//     const indexCourse = this.courses.findIndex(
//       (course: Course) => course.id === Number(id),
//     );
//     if (indexCourse === -1) {
//       throw new HttpException(
//         `Curso com o ID ${id} não encontrado`,
//         HttpStatus.NOT_FOUND,
//       );
//     }
//     // this.courses[indexCourse] = {
//     //   ...this.courses[indexCourse],
//     //   ...updatedCourse,
//     // };
//     // //outra forma de atualizar o objeto
//     Object.assign(this.courses[indexCourse], updatedCourse);
//     return this.courses[indexCourse];
//   }

//   update(id: number, updatedCourse: Partial<Course>) {
//     const course = this.courses.find((course: Course) => course.id === id);
//     if (!course) {
//       throw new HttpException(
//         `Curso com o ID ${id} não encontrado`,
//         HttpStatus.NOT_FOUND,
//       );
//     }
//     Object.assign(course, updatedCourse);
//     return course;
//   }

//   remove(id: string): boolean {
//     const indexCourse = this.courses.findIndex(
//       (course: Course) => course.id === Number(id),
//     );
//     if (indexCourse === -1) {
//       return false;
//     }
//     this.courses.splice(indexCourse, 1);
//     return true;
//   }
// }
