import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { UserTodoListItem, User } from 'App/Models'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { selectRelatedMixin } from '@ioc:Adonis/Addons/SelectRelated'

export default class UserTodoList extends compose(BaseModel, selectRelatedMixin) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => UserTodoListItem)
  public items: HasMany<typeof UserTodoListItem>
}
