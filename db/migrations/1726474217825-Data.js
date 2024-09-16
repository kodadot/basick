module.exports = class Data1726474217825 {
    name = 'Data1726474217825'

    async up(db) {
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "sn"`)
        await db.query(`ALTER TABLE "nft_entity" ADD "sn" numeric NOT NULL`)
        await db.query(`CREATE INDEX "IDX_8fed68c917920ff529994c2c65" ON "nft_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_f0abf665028feb26e32d4201c5" ON "nft_entity" ("created_at") `)
        await db.query(`CREATE INDEX "IDX_fb5a810a729fee4b0b0d3301eb" ON "nft_entity" ("sn") `)
        await db.query(`CREATE INDEX "IDX_703bf1a1b47a340c5675fdda85" ON "collection_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_b09e3db203a007fa67648832be" ON "collection_entity" ("created_at") `)
        await db.query(`CREATE INDEX "IDX_8ae50565da6e56f122ccad6c57" ON "collection_entity" ("supply") `)
        await db.query(`CREATE INDEX "IDX_fba85326b71638259b87a35197" ON "collection_entity" ("updated_at") `)
    }

    async down(db) {
        await db.query(`ALTER TABLE "nft_entity" ADD "sn" text NOT NULL`)
        await db.query(`ALTER TABLE "nft_entity" DROP COLUMN "sn"`)
        await db.query(`DROP INDEX "public"."IDX_8fed68c917920ff529994c2c65"`)
        await db.query(`DROP INDEX "public"."IDX_f0abf665028feb26e32d4201c5"`)
        await db.query(`DROP INDEX "public"."IDX_fb5a810a729fee4b0b0d3301eb"`)
        await db.query(`DROP INDEX "public"."IDX_703bf1a1b47a340c5675fdda85"`)
        await db.query(`DROP INDEX "public"."IDX_b09e3db203a007fa67648832be"`)
        await db.query(`DROP INDEX "public"."IDX_8ae50565da6e56f122ccad6c57"`)
        await db.query(`DROP INDEX "public"."IDX_fba85326b71638259b87a35197"`)
    }
}
