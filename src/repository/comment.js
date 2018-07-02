const pool = require('../db')

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
	comment,
	findComment
}