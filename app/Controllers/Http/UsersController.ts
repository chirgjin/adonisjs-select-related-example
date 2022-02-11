/**
 * This file demonstrates some simple selectRelated examples using
 * User & Profile models.
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { User } from 'App/Models'

export default class UsersController {
  /**
   * Example API which returns list of users with `profile` fetched via inner join
   */
  public async index() {
    const users = await User.query().selectRelated('profile')
    return users
  }

  /**
   * Example API which filters users by their phone numbers
   */
  public async filterByPhoneNumber({ request }: HttpContextContract) {
    const { phoneNumber } = await request.validate({
      schema: schema.create({
        phoneNumber: schema.string({}, [rules.mobile()]),
      }),
    })

    // NOTE: the field to apply where condition is profile.phone_number i.e `<relation_name>.<column_name>`.
    // Here, `column_name` is the name of column in database (not the one we define on our model which is usually in camel case)
    return User.query().selectRelated('profile').where('profile.phone_number', phoneNumber)
  }

  /**
   * Example API which filters users by their phone numbers but doesn't return the profile object
   */
  public async filterByPhoneNumberWithoutProfile({ request }: HttpContextContract) {
    const { phoneNumber } = await request.validate({
      schema: schema.create({
        phoneNumber: schema.string({}, [rules.mobile()]),
      }),
    })

    return User.query()
      .selectRelated('profile', {
        sideload: false, // sideload false means only join is applied and the columns aren't actually fetched from database
      })
      .where('profile.phone_number', phoneNumber)
  }

  /**
   * Example API which returns only phoneNumber from profile object of all users
   */
  public async withOnlyPhoneNumber() {
    const users = await User.query().selectRelated('profile', {
      columns: ['phoneNumber'], // only phoneNumber column in fetched from db.
    })
    return users
  }
}
