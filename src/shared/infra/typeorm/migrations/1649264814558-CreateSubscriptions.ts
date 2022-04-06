import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubscriptions1649264814558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'subscriptions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'registration_date',
              type: 'timestamp',
            },
            {
              name: 'participation_date',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'int',
            },
            {
              name: 'project_id',
              type: 'uuid',
            },
            {
              name: 'user_id',
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
              name: 'FKProjectSubscription',
              referencedTableName: 'projects',
              referencedColumnNames: ['id'],
              columnNames: ['project_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
            {
              name: 'FKProjectUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscriptions');
  }
}
