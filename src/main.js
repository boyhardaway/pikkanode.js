const Koa = require('koa')
const koaBody = require('koa-body')
const serve = require('koa-static')
const render = require("koa-ejs")
const path = require("path")
const session = require('koa-session')
const cors = require('@koa/cors')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
render(app, {
	root: path.join(__dirname, "views"),
	layout: "template",
	viewExt: "ejs",
	cache: false
})

const sessionStore = {}
const sessionConfig = {
	key: 'sess',
	maxAge: 1000 * 60 * 60,
	httpOnly: true,
	store: {
		get(key, maxAge, {
			rolling
		}) {
			return sessionStore[key]
		},
		set(key, sess, maxAge, {
			rolling
		}) {
			sessionStore[key] = sess
		},
		destroy(key) {
			delete sessionStore[key]
		}
	}
}

const flash = async (ctx, next) => { // Flash middleware
	if (!ctx.session) throw new Error('flash message required session')
	ctx.flash = ctx.session.flash
	delete ctx.session.flash
	await next()
}

const stripPrefix = async (ctx, next) => {
	if (!ctx.path.startsWith('/-')) {
		ctx.status = 404
		return
	}

	ctx.path = ctx.path.slice(2)
	await next()
}

// function stupidEncrypt(str, keys) {
// 	return "try to encrypt: " + str + keys;
// }

// function stupidDecrypt(str) {
// 	const pieces = str.replace('try to encrypt: ','').replace(keys,'')
// 	return pieces;
// }

// router.post('/api/v1/auth/signup', ctx => {
// 	ctx.status = 200
// 	ctx.response.body = {userId: 11}
// }) 
// router.post('/api/v1/auth/signin', ctx => {
// 	ctx.status = 200
// 	ctx.response.body = {userId: 11}
// }) 
// router.post('/api/v1/auth/signout', ctx => {
// 	ctx.status = 200
// 	ctx.response.body = {userId: 11}
// }) 
 

app.keys = ['supersecretboy']
app.use(session(sessionConfig, app))
app.use(cors({credentials: true}))
   
app.use(flash)
app.use(koaBody({
	multipart: true
}))
// app.use(router.routes())
// app.use(router.allowedMethods())
app.use(require('./route'))
app.use(stripPrefix)
app.use(serve('public'))
app.listen(8000)