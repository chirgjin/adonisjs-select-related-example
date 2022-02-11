import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class GenerateData extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'generate:data'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { UserFactory } = await import('Database/factories')

    await UserFactory.with('profile', 1)
      .with('todoLists', 1, (list) => list.with('items', 1))
      .createMany(2)

    await UserFactory.with('todoLists', 1, (list) => list.with('items', 1)).createMany(2)

    await UserFactory.with('profile', 1).createMany(2)

    await UserFactory.with('profile', 1)
      .with('todoLists', 2, (list) => list.with('items', 1))
      .createMany(2)

    await UserFactory.with('profile', 1)
      .with('todoLists', 1, (list) => list.with('items', 3))
      .createMany(2)

    this.logger.success(`Created sample data successfully`)
  }
}
