import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { User } from 'App/Models'

export default class NestedsController {
  /**
   * Example API where filtering is done on nested relationship
   */
  public async filterByTodoItem({ request }: HttpContextContract) {
    const { itemName, completed } = await request.validate({
      schema: schema.create({
        itemName: schema.string.optional({ trim: true }),
        completed: schema.boolean.optional(),
      }),
    })

    // You can nest your relations using dot (.) keyword. Just like we'd access the properties using a javascript object
    const query = User.query().selectRelated('todoLists.items')

    if (itemName !== undefined) {
      // When using the relation name in where/select condition then the table name becomes `<relation_parent>__<relation_child>`.
      // This is because table alias are used under the hood & table alias can't have dot (.) in their names
      query.where('todoLists__items.item_name', 'like', `%${itemName}%`)
    }

    if (completed !== undefined) {
      query.where('todoLists__items.completed', completed)
    }

    // NOTE: as we use inner join for this operation, if multiple rows are matched for todo list item
    // then multiple *User* rows will be returned in response as well
    return await query
  }

  /**
   * Example API where both select related & preload are used
   */
  public async selectRelatedWithPreload() {
    return await User.query()
      .selectRelated('profile') // loaded via inner join
      .preload('todoLists', (builder) => {
        // loaded via separate query (normal preload behaviour) with inner join on user to load the user data
        builder.selectRelated('user')
      })
  }

  /**
   * Example API where a different type of join is used
   */
  public async usersWithoutProfile() {
    return await User.query()
      .selectRelated('profile', {
        sideload: false,
        joinType: 'leftOuter',
      })
      .whereNull('profile.id')
  }
}
