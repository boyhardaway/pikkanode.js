const { user } = require('../../repository')

const getHandler = async (ctx) => {
	
	const rows = await user.findPhotoAll()
	let obj = {}
	obj.photos = rows

	await ctx.render('main', obj)
}

module.exports = {
	getHandler
}
