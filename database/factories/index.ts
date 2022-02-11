import { User, Profile, UserTodoList, UserTodoListItem } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export const UserTodoListItemFactory = Factory.define(UserTodoListItem, ({ faker }) => {
  return {
    itemName: faker.lorem.word(),
    completed: faker.datatype.boolean(),
  }
}).build()

export const UserTodoListFactory = Factory.define(UserTodoList, ({ faker }) => {
  return {
    title: faker.lorem.words(),
  }
})
  .relation('items', () => UserTodoListItemFactory)
  .build()

export const ProfileFactory = Factory.define(Profile, ({ faker }) => {
  return {
    phoneNumber: faker.phone.phoneNumber(),
    dateOfBirth: DateTime.fromJSDate(faker.date.past()),
  }
}).build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }
})
  .relation('profile', () => ProfileFactory)
  .relation('todoLists', () => UserTodoListFactory)
  .build()
