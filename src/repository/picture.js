const pool = require('../db')

const upload = async (filename, caption, detail, id) => {
	//console.log(ctx.session.userId)
	const [ResultSetHeader] = await pool.query(`
	INSERT INTO pictures
		(id, caption, created_by, detail) 
	VALUES 
		(?, ?, ?, ?)
	`, [filename, caption, id, detail])
	return ResultSetHeader.insertId
}

const findPhotoAll = async () => {
	const [rows] = await pool.query(`
		select id, caption, created_at, created_by, detail
		from pictures
	`)
	return rows
}

const findPhotoById = async (id) => {
	const [rows] = await pool.query(`
		select id, caption, created_at, created_by, detail
		from pictures where id = ?
	`, id)
	return rows
}

const findPhotoByCaption = async (caption) => {
	const [rows] = await pool.query(`
		select id, caption, created_at, created_by, detail
		from pictures where caption like ?
	`, `%${caption}%`)
	return rows
}

const like = async (userId, pictureId) => {
	const [ResultSetHeader] = await pool.query(`
			INSERT INTO likes(user_id, picture_id) 
			VALUES (?, ?)
	`, [userId, pictureId])
	console.log(ResultSetHeader)
	return ResultSetHeader
}

const unLike = async (userId, pictureId) => {
	const [ResultSetHeader] = await pool.query(`
			delete From likes where user_id = ? and picture_id = ?
	`, [userId, pictureId])
	console.log(ResultSetHeader)
	return ResultSetHeader
}

const findLike = async (userId, pictureId) => {
	const [rows] = await pool.query(`
		select count(1) From likes where user_id = ? and picture_id = ?
	`, [userId, pictureId])
	return rows
}

const comment = async (text, pictureId, userId) => {
	const [ResultSetHeader] = await pool.query(`
			INSERT INTO comments(text, picture_id, created_by) 
			VALUES (?,?,?,?)
	`, [text, pictureId, userId])
	return ResultSetHeader.insertId
}

const findComment = async (userId, pictureId) => {
	const [rows] = await pool.query(`
		select text, picture_id, created_by From comments 
		where created_by = ? and picture_id = ?
	`, [userId, pictureId])
	return rows
}

module.exports = {
	upload,
	findPhotoAll,
	findPhotoById,
	findPhotoByCaption,
	like,
	unLike,
	findLike,
	comment,
	findComment
}