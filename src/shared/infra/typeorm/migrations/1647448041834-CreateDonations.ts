import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDonations1647448041834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'donations',
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
              name: 'total_value',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'total_collected',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'smallint',
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
              name: 'FKDonationOrganizarion',
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
    await queryRunner.dropTable('donations');
  }
}
