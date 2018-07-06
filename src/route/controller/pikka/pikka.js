const { picture, like } = require('../../../repository')

const getHandler = async (ctx) => {
	const [rows] = await picture.findPhotoById(ctx.params.id)
	let obj = {}
	obj.photos = rows
 
	let [res] = await like.findLike(ctx.session.userId, ctx.params.id)

	if (res.count === 0){ 
		obj.likes = {text: 'Like'}
	}else{ 	
		obj.likes = {text: 'Unlike'}
	}
	// ctx.body = obj 
	await ctx.render('pikka', obj)
}
 
module.exports = {
	getHandler
}
