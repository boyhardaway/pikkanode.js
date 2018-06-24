const bcrypt = require('bcrypt')
const {user} = require('../../../repository')
 

const getHandler = async (ctx) => {
	// ctx.body = 'sign in get handler'
	const data = {
		flash: ctx.flash
	}
	await ctx.render('/signin', data)
}

const postHandler = async (ctx) => {
	const {
		email,
		password
	} = ctx.request.body


	if (!email) { 
		ctx.session.flash = {
			error: 'Email required'
		}
		return ctx.redirect('/signin')
	}
	const [data] = await user.checkSignin(email)
	//  console.log(data)
	if (!data) {
		ctx.session.flash = { error: 'mail not found' }
		return ctx.redirect('/signin')
	}
	const same = await bcrypt.compare(password, data.password)
	if (!same) { 
		ctx.session.flash = {
			error: 'Wrong password'
		}
		return ctx.redirect('/signin')
	}

	// ctx.session.flash = { success: 'Sign in OK' }
	// return ctx.redirect('/signin')

	ctx.session.userId = data.id
	ctx.redirect('/')
}


module.exports = {
	getHandler,
	postHandler
}