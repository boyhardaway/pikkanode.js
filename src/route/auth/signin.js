const getHandler = async (ctx) => {
	// ctx.body = 'sign in get handler'
	await ctx.render('/signin')
}

const postHandler = (ctx) => {
	ctx.body = `<h1>${ctx.request.body.email}</h1><br> <h1>${ctx.request.body.password}</h1>`
}

module.exports = {
	getHandler,
	postHandler
}
