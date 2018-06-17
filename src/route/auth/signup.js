const bcrypt = require('bcrypt')

const { user } = require('../../repository')

const getHandler = async (ctx) => {
	// ctx.body = 'sign up get handler'
	await ctx.render('/signup')
}

const postHandler = async (ctx) => {
	const { email, password } = ctx.request.body
	// TODO: validate email, password
 
	const hashedPassword = await bcrypt.hash(password, 10)
	const userId = await user.register(email, hashedPassword)
	// console.log(userId)

	// TODO: handle user id ?

	ctx.redirect('/signin')
}

module.exports = {
	getHandler,
	postHandler
}
