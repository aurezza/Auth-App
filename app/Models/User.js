'use strict'

const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeCreate', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  files () {
    return this.hasMany('App/Models/File')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

// module.exports = User

// User Model Mongoose
// 'use strict'

// const BaseModel = use('MongooseModel')

// /**
//  * @class User
//  */
// class User extends BaseModel {
//   static boot ({ schema }) {  }
//   /**
//    * User's schema
//    */
//   static get schema () {
//     return {
//       first_name: 'String',
//       last_name: 'String',
//       email: 'String'
//     }
//   }
// }

// module.exports = User.buildModel('User')