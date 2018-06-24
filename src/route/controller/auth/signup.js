const bcrypt = require('bcrypt')

const { user } = require('../../../repository')

const getHandler = async (ctx) => {
	await ctx.render('/signup')
}

const postHandler = async (ctx) => {
	// console.log(ctx.request.body)
	let userId 
	if (ctx.request.body.id) { 
		const { id, email, first_name, last_name,  } = ctx.request.body
		userId = await user.register(email, '', id, first_name, last_name)
	}else{
		const { email, password } = ctx.request.body
		const hashedPassword = await bcrypt.hash(password, 10)
		userId = await user.register(email, hashedPassword, '', '', '')
	}
	// console.log(userId)
	ctx.body = userId
	ctx.redirect('/signin') 
}

module.exports = {
	getHandler,
	postHandler
}
