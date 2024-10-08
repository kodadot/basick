import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "@subsquid/typeorm-store"
import {CollectionEvent} from "./collectionEvent.model"
import {Kind} from "./_kind"
import {MetadataEntity} from "./metadataEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {CollectionType} from "./_collectionType"

@Entity_()
export class CollectionEntity {
    constructor(props?: Partial<CollectionEntity>) {
        Object.assign(this, props)
    }

    @StringColumn_({nullable: true})
    baseUri!: string | undefined | null

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @StringColumn_({nullable: false})
    currentOwner!: string

    @IntColumn_({nullable: false})
    distribution!: number

    @OneToMany_(() => CollectionEvent, e => e.collection)
    events!: CollectionEvent[]

    @BigIntColumn_({nullable: false})
    floor!: bigint

    @Index_({unique: true})
    @StringColumn_({nullable: false})
    hash!: string

    @BigIntColumn_({nullable: false})
    highestSale!: bigint

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @StringColumn_({nullable: false})
    issuer!: string

    @Column_("varchar", {length: 6, nullable: true})
    kind!: Kind | undefined | null

    @IntColumn_({nullable: true})
    max!: number | undefined | null

    @StringColumn_({nullable: true})
    media!: string | undefined | null

    @Index_()
    @ManyToOne_(() => MetadataEntity, {nullable: true})
    meta!: MetadataEntity | undefined | null

    @StringColumn_({nullable: true})
    metadata!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @IntColumn_({nullable: false})
    nftCount!: number

    @OneToMany_(() => NFTEntity, e => e.collection)
    nfts!: NFTEntity[]

    @IntColumn_({nullable: false})
    ownerCount!: number

    @Index_()
    @IntColumn_({nullable: false})
    supply!: number

    @StringColumn_({nullable: true})
    symbol!: string | undefined | null

    @Column_("varchar", {length: 7, nullable: false})
    type!: CollectionType

    @Index_()
    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @IntColumn_({nullable: false})
    version!: number

    @BigIntColumn_({nullable: false})
    volume!: bigint
}
