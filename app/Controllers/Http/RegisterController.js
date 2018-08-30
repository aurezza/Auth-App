'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Mail = use('Mail')
const randomString = require('random-string')

class RegisterController {
    async index({ view }) {
        return view.render('auth.register')
    }

    async store({ request, response, session }) {
        // validate
        const validation = await validate(request.all(), {
            username: 'required|unique:users, username',
            email: 'required|email|unique:users, email',
            password: 'required'
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()

            return response.redirect('back')
        }
        // create user 
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password'),
            confirmation_token: randomString({ length: 40 })
        })

        // send confirmation email
        await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
            message.to(user.email)
            .from('hello@adonis.com')
            .subject('This is to confirm your email  address!')
        })
        // display success message
        session.flash({
            notification: {
                type: 'success',
                message: 'Registration successful! An email has been sent to your email address, please confirm.'
            }
        })

        return response.redirect('back')
    }

    async confirm({ params, session, response }) {
        // get user with the confirmation token 
        const user = await User.findBy('confirmation_token', params.token)
        // TODO: error message saying confirmation_token expired
        // set confirmation to null and is_active to true
        user.confirmation_token = null
        user.is_active = true
        // persist user to database
        await user.save()
        // display success message
        session.flash({
            notification: {
                type: 'success',
                message: 'Your email address has been confirmed'
            }
        })

        return response.redirect('/login')
    }
}

module.exports = RegisterController
