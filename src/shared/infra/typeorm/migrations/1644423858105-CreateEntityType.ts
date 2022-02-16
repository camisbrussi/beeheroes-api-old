import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEntityType1644423858105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "entities_types",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                           name: "created_at",
                           type: "timestamp",
                           default: "now()"
                        },
                        {
                           name: "updated_at",
                           type: "timestamp",
                           default: "now()"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable("entities_types")
    }

}
