const Router = require('koa-router')

const upload = require('./upload')
const main = require('./main')
const pikka = require('./pikka')
const comment = require('./comment')
const like = require('./like')

const router = new Router()

const checkAuth = async (ctx, next) => { 
	if (!ctx.session || !ctx.session.userId) {
		// ctx.session.flash = {
		// 	error: '',
		// 	success: ''
		// }
		return ctx.redirect('/signin') 
		} 
	await next()
   }



router.get('/upload', checkAuth, upload.getHandler)
router.post('/upload', upload.postHandler)
router.get('/', main.getHandler)
router.get('/pikka/:id', checkAuth, pikka.getHandler)
router.post('/pikka/:id/comment', comment.postHandler)
router.post('/pikka/:id/like', like.postHandler)

 
module.exports = router.routes()
