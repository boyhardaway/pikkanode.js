const { like } = require('../../../repository')

const postHandler = async (ctx) => { 
	let obj 
	let [res] = await like.findLike(ctx.session.userId, ctx.params.id)	
	if (res.count === 0){
		await like.like(ctx.session.userId, ctx.params.id)	
		obj = {text: 'Like'}
	}else{
		await like.unLike(ctx.session.userId, ctx.params.id)	
		obj = {text: 'Unlike'}
	}
	// ctx.redirect('/pikka/'+ctx.params.id)
	
	ctx.body = obj
}

module.exports = {
	postHandler
}
