module.exports = class Data1716298176056 {
    name = 'Data1716298176056'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "symbol" text`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "symbol"`)
    }
}
