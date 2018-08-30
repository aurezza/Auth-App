'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
    async index({ view, response }) {
        return view.render('auth.login')
    }

    async show({ request, auth, session, response }) {
        // get form data
        const { email, password, remember } = request.all()
        // retrieve user based on the form data
        const user = await User.query()
            .where('email', email)
            .where('is_active', true)
            .first()
        // verify password
        // if (!user) return response.status(403).send('unauthorized')
        //login user
        if (user) {
            console.log('user exists')
            const passWordVerified = await Hash.verify(password, user.password)
            if (passWordVerified) {
                await auth.remember(!!remember).login(user)

                return response.redirect('/')
            }
        }
        
        
        // display error message
        session.flash({
            notification: {
                type: 'danger',
                message: 'We could not verify your credentials. Make sure you have confirmed your email address'
            }
        })

        return response.redirect('back')
    }
}

module.exports = LoginController
