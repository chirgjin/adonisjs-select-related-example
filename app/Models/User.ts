import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ModelAttributes,
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { selectRelatedMixin } from '@ioc:Adonis/Addons/SelectRelated'
import { Profile, UserTodoList } from 'App/Models'
export default class User extends compose(BaseModel, selectRelatedMixin) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => UserTodoList)
  public todoLists: HasMany<typeof UserTodoList>

  /**
   * Helper to convert a columnName to `<table_name>.<column_name>` format for use with select related
   */
  public static col(columnName: NonNullable<keyof ModelAttributes<User>>): string {
    return `${this.table}.${this.$getColumn(columnName)!.columnName}`
  }
}
