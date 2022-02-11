import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { selectRelatedMixin } from '@ioc:Adonis/Addons/SelectRelated'

export default class Profile extends compose(BaseModel, selectRelatedMixin) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public phoneNumber: string | null

  @column.date()
  public dateOfBirth: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
