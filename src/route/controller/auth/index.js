const Router = require('koa-router')

const signIn = require('./signin')
const signUp = require('./signup')

const router = new Router()

const checkIsLogin = async (ctx, next) => { 
	if (ctx.session && ctx.session.userId) {
		// ctx.session.flash = {
		// 	error: '',
		// 	success: ''
		// }
		return ctx.redirect('/') 
		} 
	await next()
   }

router.get('/signin', checkIsLogin, signIn.getHandler)
router.post('/signin', signIn.postHandler)
router.get('/signup', checkIsLogin, signUp.getHandler)
router.post('/signup', signUp.postHandler)

module.exports = router.routes()
