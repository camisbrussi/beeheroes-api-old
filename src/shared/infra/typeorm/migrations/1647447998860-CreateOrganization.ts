import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrganization1647447998860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'organizations',
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
              name: 'cnpj',
              type: 'varchar',
            },
            {
              name: 'avatar',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'status',
              type: 'smallint',
            },
            {
              name: 'organization_type_id',
              type: 'int',
            },
            {
              name: 'address_id',
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
              name: 'FKTypeOrganization',
              referencedTableName: 'organization_types',
              referencedColumnNames: ['id'],
              columnNames: ['organization_type_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },

            {
              name: 'FKAddressOrganization',
              referencedTableName: 'addresses',
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
    await queryRunner.dropTable('organizations');
  }
}
