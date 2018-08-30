'use strict'

class AuthenticatedController {
    async index({ auth, response }) {
        await auth.logout()

        return response.redirect('/login')
    }
}

module.exports = AuthenticatedController
