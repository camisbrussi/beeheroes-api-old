import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1646958513385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'addresses',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'street',
              type: 'varchar',
            },
            {
              name: 'number',
              type: 'varchar',
            },
            {
              name: 'complement',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'district',
              type: 'varchar',
            },
            {
              name: 'cep',
              type: 'int',
            },
            {
              name: 'city_id',
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
              name: 'FKCityAddress',
              referencedTableName: 'cities',
              referencedColumnNames: ['id'],
              columnNames: ['city_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses');
  }
}
