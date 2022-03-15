import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateRolePermissions1646958272820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions_roles',
        columns: [
          {
            name: 'permission_id',
            type: 'uuid',
          },
          {
            name: 'role_id',
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
      'permissions_roles',
      new TableForeignKey({
        name: 'FKRolePermission',
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        columnNames: ['role_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'permissions_roles',
      new TableForeignKey({
        name: 'FKPermissionRole',
        referencedTableName: 'permissions',
        referencedColumnNames: ['id'],
        columnNames: ['permission_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'permissions_roles', 'FKRolePermission',
    );

    await queryRunner.dropForeignKey(
      'permissions_roles', 'FKPermissionRole',
    );

    await queryRunner.dropTable('permissions_role');
  }
}
