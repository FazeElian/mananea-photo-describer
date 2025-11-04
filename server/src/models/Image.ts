import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import User from "./User";

@Table({
    tableName: "images"
})

class Image extends Model {
    @Column({
        type: DataType.STRING
    })
    declare url: string

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Image;