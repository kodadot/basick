module.exports = class Data1726484389986 {
    name = 'Data1726484389986'

    async up(db) {
        await db.query(`ALTER TABLE "metadata_entity" ADD "banner" text`)
        await db.query(`ALTER TABLE "metadata_entity" ADD "kind" character varying(6)`)
        await db.query(`ALTER TABLE "collection_entity" ADD "kind" character varying(6)`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "banner"`)
        await db.query(`ALTER TABLE "metadata_entity" DROP COLUMN "kind"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "kind"`)
    }
}
