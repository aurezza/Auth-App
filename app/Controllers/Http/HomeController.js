'use strict'

const Helpers = use('Helpers')
const User = use('App/Models/User')
const File = use('App/Models/File')
const UserMongoose = use('App/Models/UserMongoose')

class HomeController {
    async index({ view }) {
        // mongoose create
        // const user = await UserMongoose.create({
        //     first_name: 'mister',
        //     last_name: 'meep',
        //     email: 'test@test.com'
        // })
        // mysql fetch first user
        // const users = await File.find(1)
        // const file = await users.files().fetch()
        // console.log('user: ', user)
        // console.log('file: ', files)
        // return user;
        return view.render('welcome')
    }

    async testApi({ response, params }) {
        const user = await User.find(params.id)
        const file = await user.files().fetch()
        // mongoose 
        // const users = await User.all()
        // const file = await users.files().fetch()
        return response.send(file)
    }

    async modal({ view }) {
        return view.render('welcome')
    }
    
    async upload({ request, response }) {
        const profilePic = request.file('profile_pic', {
            type: ['image'],
            size: '2mb'
        })

        await profilePic.move(Helpers.tmpPath('uploads'), {
            name: 'custom-name.jpg'
        })

        if(!profilePic.moved()) {
            return profilePic.error()
        }

        // return 'File moved'
        return response.redirect('back')
    }

    async uploadCsv({ request, response }) {
        const body = request.all()
        
        // TODO: add validation before saving each instance
        await body.fileData.forEach(async (data) => {
            let file = new File()
            file.file_name = 'test'
            file.first_name = data.first_name
            file.first_name = data.first_name
            file.last_name = data.last_name
            file.email = data.email
            file.gender = data.gender
            await file.save()
        })
       
        // TODO: add a download response instead
        return response.send(body)
    }
}

module.exports = HomeController
