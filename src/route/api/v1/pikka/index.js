const Router = require('koa-router')
const { picture } = require('../../../../repository')
const router = new Router()

// router.get('/api/v1/pikka',  list)
router.get('/', list)
 

async function list (ctx) {
	ctx.status = 200
    const rows = await picture.findPhotoAll()
	ctx.body = rows
}

module.exports = router.routes()
