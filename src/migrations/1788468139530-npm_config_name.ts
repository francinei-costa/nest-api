import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class NpmConfigName1788468139530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            // isGenerated: true,
            // generationStrategy: "increment",
          },
          {
            name: 'name',
            type: 'varchar',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tags');
  }
}
