import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjects1646958566534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'projects',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'start',
              type: 'timestamp',
            },
            {
              name: 'end',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'vacancies',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'int',
            },
            {
              name: 'organization_id',
              type: 'uuid',
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
              name: 'FKProjectOrganization',
              referencedTableName: 'organizations',
              referencedColumnNames: ['id'],
              columnNames: ['organization_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
