import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateProfileTable1685611257157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
              CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY,
                firstName TEXT,
                lastName TEXT
              )
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }

}
