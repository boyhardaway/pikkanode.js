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
	// console.log('post signin')
	// console.log('ctx.request.body.id : ' + ctx.request.body.id)
	const {email,password} = ctx.request.body
	let sessionUserid 
	
	if (ctx.request.body.id) { 
		// console.log('ctx.request.body.id : ' + ctx.request.body.id)
		const { id, email, first_name, last_name,  } = ctx.request.body
		userId = await user.register(email, '', id, first_name, last_name)
		
		sessionUserid = ctx.request.body.id
		// console.log('sessionUserid : ' + sessionUserid)
	}else{
		if (!email) { 
		ctx.session.flash = {
			error: 'Email required'
		}
		return ctx.redirect('/signin')
		}
		const [data] = await user.checkSignin(email)
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
		sessionUserid = data.id
	}
	

	// ctx.session.flash = { success: 'Sign in OK' }
	// return ctx.redirect('/signin')

	ctx.session.userId = sessionUserid
	ctx.redirect('/')
}


module.exports = {
	getHandler,
	postHandler
}