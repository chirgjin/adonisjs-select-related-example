import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { UserTodoList } from 'App/Models'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { selectRelatedMixin } from '@ioc:Adonis/Addons/SelectRelated'

export default class UserTodoListItem extends compose(BaseModel, selectRelatedMixin) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userTodoListId: number

  @belongsTo(() => UserTodoList)
  public userTodoList: BelongsTo<typeof UserTodoList>

  @column()
  public itemName: string

  @column()
  public completed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
