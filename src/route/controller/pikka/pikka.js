const { picture } = require('../../../repository')

const getHandler = async (ctx) => {
	const [rows] = await picture.findPhotoById(ctx.params.id)
	let obj = {}
	obj.photos = rows

	await ctx.render('pikka', obj)
}
 
module.exports = {
	getHandler
}
