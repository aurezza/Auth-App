'use strict'

const { validate, validateAll } = use('Validator')
const User = use('App/Models/User')
const PasswordReset = use('App/Models/PasswordReset')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')

class PasswordResetController {
    async index({ view }) {
        return view.render('auth.password.email')
    }

    async sendResetLink({ request, session, response }) {
        // validate form input
        const validation = await validate(request.only('email'), {
            email: 'required|email'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()

            return response.redirect('back')
        } 

        try {
            // get user
            console.log('try triggered')
            const user = await User.findBy('email', request.input('email'))

            await PasswordReset.query().where('email', user.email).delete()

            const { token } = await PasswordReset.create({
                email: user.email,
                token: randomString({ length: 40 })
            })

            const mailData = {
                user: user.toJSON(),
                token
            }

            await Mail.send('auth.emails.password_reset', mailData, message => {
                message
                    .to(user.email)
                    .from('hello@adonis.com')
                    .subject('Password reset link')
            })

            session.flash({
                notification: {
                  type: 'success',
                  message: 'A password reset link has been sent to your email address.'
                }
            })

            return response.redirect('back')

        } catch (error) {
            session.flash({
                notification: {
                  type: 'danger',
                  message: 'Sorry, there is no user with this email address.'
                }
              })
        
            return response.redirect('back')
        }
    }

    async showResetForm({ params, view }) {
        console.log('loading reset form')
        const token = params.token 
        // second argument/param in render view should be object if data
        return view.render('auth.password.reset', { token })
    }

    async update({ request, session, response }) {
        // validate form inputs
        const validation = await validateAll(request.all(), {
            token: 'required',
            email: 'required',
            password: 'required|confirmed'
        })
    
        if (validation.fails()) {
            session
            .withErrors(validation.messages())
            .flashExcept(['password', 'password_confirmation'])
    
            return response.redirect('back')
        }
    
        try {
            console.log('try triggered')
            // get user by the provider email
            const user = await User.findBy('email', request.input('email'))
    
            // check if password reet token exist for user
            const token = await PasswordReset.query()
                .where('email', user.email)
                .where('token', request.input('token'))
                .first()

            console.log('token', token)
    
            if (!token) {
            // display error message
            session.flash({
                notification: {
                type: 'danger',
                message: 'This password reset token does not exist.'
                }
            })
    
            return response.redirect('back')
            }
    
            user.password = await Hash.make(request.input('password'))
            await user.save()
    
            // delete password reset token
            await PasswordReset.query().where('email', user.email).delete()
    
            // display success message
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Your password has been reset!'
                }
            })
    
            return response.redirect('/login')
        } catch (error) {
            // display error message
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Sorry, there is no user with this email address.'
                }
            })
            return response.redirect('back')
        }
    }
}

module.exports = PasswordResetController
