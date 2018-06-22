const { picture } = require('../../repository')

const getHandler = async (ctx) => {
	
	const rows = await picture.findPhotoAll()
	let obj = {}
	obj.photos = rows

	await ctx.render('main', obj)
}

module.exports = {
	getHandler
}
