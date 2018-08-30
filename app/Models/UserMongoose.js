// User Model
'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class User
 */
class UserMongoose extends BaseModel {
   
  static boot ({ schema }) {  }
  /**
   * User's schema
   */
  static get schema () {
    return {
      first_name: 'String',
      last_name: 'String',
      email: 'String'
    }
  }
}

module.exports = UserMongoose.buildModel('UserMongoose')