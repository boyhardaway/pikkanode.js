const {picture} = require('../../../repository')

const postHandler = async (ctx) => {
	console.log(ctx.params.id)
	let res = await picture.findLike(ctx.params.id)
	
}

module.exports = {
	postHandler
}
