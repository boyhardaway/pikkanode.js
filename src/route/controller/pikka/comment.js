const {picture} = require('../../../repository')

const postHandler = (ctx) => {
	console.log(ctx.params.id)
	
}

module.exports = {
	postHandler
}
