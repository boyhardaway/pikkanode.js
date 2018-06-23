const Router = require('koa-router')

const upload = require('./upload')
const main = require('./main')
const pikka = require('./pikka')
const comment = require('./comment')
const like = require('./like')

const router = new Router()

const checkAuth = async (ctx, next) => {
	if (ctx.path !== '/signin') {
		if (!ctx.session || !ctx.session.userId) {
            // await ctx.render('signin') 
            ctx.body = `<p>you are not signed in</p>
                <a href="/signin">signin here</a>
            `
			return
		  }
	} 	
	await next()
   }

router.get('/upload', checkAuth, upload.getHandler)
router.post('/upload', upload.postHandler)
router.get('/', checkAuth, main.getHandler)
router.get('/pikka/:id', pikka.getHandler)
router.post('/pikka/:id/comment', comment.postHandler)
router.post('/pikka/:id/like', like.postHandler)



module.exports = router.routes()
