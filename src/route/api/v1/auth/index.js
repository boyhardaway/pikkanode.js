const Router = require('koa-router') 
const router = new Router()

router.post('/', signup)

async function signup (ctx) {
    const { email, password } = ctx.request.body
	const hashedPassword = await bcrypt.hash(password, 10)
	userId = await user.register(email, hashedPassword, '', '', '')
	ctx.body = {userId: userId}
}

module.exports = router.routes()
