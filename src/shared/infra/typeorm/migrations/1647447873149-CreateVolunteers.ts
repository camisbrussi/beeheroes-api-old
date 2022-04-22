import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVolunteers1647447873149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'volunteers',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'user_id',
              type: 'uuid',
            },
            {
              name: 'occupation_area_id',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'FKUserVolunteer',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
            {
              name: 'FKOccupationAreaVolunteer',
              referencedTableName: 'occupations_area',
              referencedColumnNames: ['id'],
              columnNames: ['occupation_area_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('volunteers');
  }
}
