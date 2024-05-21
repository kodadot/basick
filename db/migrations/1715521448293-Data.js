module.exports = class Data1715521448293 {
    name = 'Data1715521448293'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "base_uri" text`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "base_uri"`)
    }
}
