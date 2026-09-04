import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagsIdToCoursesTagsTable1788477835511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'FK_Courses_tags_Tags',
        columnNames: ['tagsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'FK_Courses_tags_Tags');
    await queryRunner.dropColumn('courses_tags', 'tagsId');
  }
}
