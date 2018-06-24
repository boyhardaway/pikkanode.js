const bcrypt = require('bcrypt')

const { user } = require('../../../repository')

const getHandler = async (ctx) => {
	// ctx.body = 'sign up get handler'
	await ctx.render('/signup')
}

const postHandler = async (ctx) => {
	let userId
	console.log(ctx.request.body)
	if (ctx.request.body.id) { 
		const { id, email, first_name, last_name,  } = ctx.request.body
		userId = await user.register(email, '', id, first_name, last_name)
	}else{
		const { email, password } = ctx.request.body
		// TODO: validate email, password 
		const hashedPassword = await bcrypt.hash(password, 10)
		userId = await user.register(email, hashedPassword, '', '', '')
	}
		
	// ctx.redirect('/signin')
	// console.log(userId)
	ctx.body = {
		'message': 'userId : ' + userId
	  }
}

module.exports = {
	getHandler,
	postHandler
}
