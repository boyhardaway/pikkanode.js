const { user } = require('../../repository')

const getHandler = async (ctx) => {
	ctx.body = 'pikka page'
}

module.exports = {
	getHandler
}
