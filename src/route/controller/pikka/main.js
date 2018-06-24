const { picture } = require('../../../repository')

const getHandler = async (ctx) => { 
	let obj = {} 
	if (ctx.query.val) {
		const rows = await picture.findPhotoByCaption(ctx.query.val)
		obj.photos = rows
	}else{
		const rows = await picture.findPhotoAll()
		obj.photos = rows
	}
  
	await ctx.render('main', obj)
}

module.exports = {
	getHandler
}
