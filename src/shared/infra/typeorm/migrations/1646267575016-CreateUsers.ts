import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1646267575016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'users',
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
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'status',
              type: 'smallint',
            },
            {
              name: 'user_type_id',
              type: 'int',
            },
            {
              name: 'address_id',
              type: 'uuid',
              isNullable: true,
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
              name: 'FKTypeUser',
              referencedTableName: 'user_types',
              referencedColumnNames: ['id'],
              columnNames: ['user_type_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
            {
              name: 'FKAddressUser',
              referencedTableName: 'address',
              referencedColumnNames: ['id'],
              columnNames: ['address_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
