const uuidv4 = require('uuid/v4')
const fs = require('fs-extra')
const path = require('path')
const { picture } = require('../../../repository')

const getHandler = async (ctx) => {
	// ctx.body = 'upload page'
	await ctx.render('/upload')
}

const postHandler = async (ctx) => {
	const pictureDir = path.join(process.cwd(), 'public/images')
	const allowFileType = {
		'image/png': true,
		'image/jpeg': true
	  }
	if (!allowFileType[ctx.request.files.photo.type]) {
		throw new Error('file type not allow')
	}
	const { caption, detail } = ctx.request.body
	const fileName = uuidv4()
	
	console.log('------ctx.session.userId--------' + ctx.session.userId)
	await picture.upload(fileName, caption, detail, ctx.session.userId)
	// console.log('------ctx.session.userId--------')
	// console.log(ctx.session.userId)
	await fs.copy(ctx.request.files.photo.path, path.join(pictureDir, fileName))
	ctx.redirect('/')
}

module.exports = {
	getHandler,
	postHandler
}
