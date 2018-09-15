const Router = require('koa-router') 
const router = new Router()

const bcrypt = require('bcrypt')
const { user } = require('../../../../repository')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)


async function signup (ctx) {
	// console.log('xxxxxxxx')
	// console.log( ctx.request.body)
	const { email, password } = ctx.request.body
	
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
		ctx.status = 400
		ctx.response.body = {error: 'invalid email'}
		return
	}
	if (password.length <= 10){
		ctx.status = 400
		ctx.response.body = {error: 'password too short'}
		return
	}
	const hashedPassword = await bcrypt.hash(password, 10)
	userId = await user.register(email, hashedPassword, '', '', '')
	
	if (userId == 1){
		ctx.status = 400
		ctx.response.body = {error: 'email already used'}
	}else{
		ctx.response.body = {userId: userId}
	}
	
}

async function signin(ctx) {
	const {email,password} = ctx.request.body
	// console.log(email,password)
		if (!email) {  
			ctx.status = 400
			ctx.response.body = {error: 'Email required'}
			return
		}
		const [data] = await user.checkSignin(email)
		// console.log(data)
		if (!data) {
			ctx.status = 400
			ctx.response.body = { error: 'mail not found' }
			return
		}
		const same = await bcrypt.compare(password, data.password)
		// console.log(same)
		if (!same) { 
			ctx.status = 400
			ctx.response.body = {error: 'wrong email or password'}
			return
		}
		ctx.session.userId = data.id
		ctx.status = 200
		ctx.response.body = {}
	}

	async function signout (ctx) {
		ctx.session.userId = null
		ctx.status = 200
		ctx.response.body = {}
	}
	
module.exports = router.routes()
