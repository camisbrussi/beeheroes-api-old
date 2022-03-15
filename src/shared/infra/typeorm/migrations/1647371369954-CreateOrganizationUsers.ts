import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateOrganizationUsers1647371369954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organizations_users',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
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
      }),
    );

    await queryRunner.createForeignKey(
      'organizations_users',
      new TableForeignKey({
        name: 'FKOrganizationUser',
        referencedTableName: 'organizations',
        referencedColumnNames: ['id'],
        columnNames: ['organization_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'organizations_users',
      new TableForeignKey({
        name: 'FKUserOrganization',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'organizations_users', 'FKOrganizationUser',
    );

    await queryRunner.dropForeignKey(
      'organizations_users', 'FKUserOrganization',
    );

    await queryRunner.dropTable('organizations_users');
  }
}
