import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCursesIdToCoursesTagsTable1788475831516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'FK_Courses_tags_Courses',
        columnNames: ['coursesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'FK_Courses_CoursesTags');
    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }
}
