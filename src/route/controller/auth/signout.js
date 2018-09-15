const { user } = require('../../../repository')

const getHandler = async (ctx) => {
	await ctx.render('/signup')
}

const postHandler = async (ctx) => { 

}

module.exports = {
	getHandler,
	postHandler
}
