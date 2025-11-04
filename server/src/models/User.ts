import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    AllowNull,
} from "sequelize-typescript";

@Table({
    tableName: "users"
})

class User extends Model {
    @AllowNull(false)
    @Unique(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare userName: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(60)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @Column({
        type: DataType.STRING(6)
    })
    declare code: string
}

export default User;