const {user} = require('../../../repository')
const bcrypt = require('bcrypt')

const getHandler = async (ctx) => {
    const [rows] = await user.findUserById(ctx.session.userId)
    let obj = {}
    obj.profile = rows
    if (!ctx.session.flash){
        obj.flashMsg = { flash: ctx.flash }
    }
    // console.log(obj)
    await ctx.render('profile', obj)
}

const postHandler = async (ctx) => {
    console.log(ctx.request.body)
    const { password, facebook_user_id, email, firstname, lastname,  } = ctx.request.body
    if (!email) { 
		ctx.session.flash = {
			error: 'email required'
		}
		return ctx.redirect('/profile')
    }
    if (!password) { 
		ctx.session.flash = {
			error: 'password required'
		}
		return ctx.redirect('/profile')
	}
    const hashedPassword = await bcrypt.hash(password, 10)

    let res = await user.editProfile(email, hashedPassword, facebook_user_id, firstname, lastname)
     
    if (res>0){
        ctx.session.flash = { success: 'Update in OK' }
        return ctx.redirect('/profile')
    }else{
        return ctx.redirect('/profile')
    }
    
}


module.exports = {
    getHandler,
    postHandler
}