module.exports = class Data1708862933373 {
    name = 'Data1708862933373'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "distribution" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "floor" numeric NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "highest_sale" numeric NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "nft_count" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "owner_count" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "supply" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "version" integer NOT NULL`)
        await db.query(`ALTER TABLE "collection_entity" ADD "volume" numeric NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "distribution"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "floor"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "highest_sale"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "nft_count"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "owner_count"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "supply"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "version"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "volume"`)
    }
}
