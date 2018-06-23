const { picture } = require('../../repository')

const getHandler = async (ctx) => {
	const rows = await picture.findPhotoById()
	ctx.body = 'pikka page'
}

module.exports = {
	getHandler
}
