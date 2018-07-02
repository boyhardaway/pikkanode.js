const pool = require('../db')

const like = async (userId, pictureId) => {
    console.log(userId + ' : ' + pictureId)
	const [ResultSetHeader] = await pool.query(`
			INSERT INTO likes(user_id, picture_id) 
			VALUES (?, ?)
	`, [userId, pictureId])
	
	return ResultSetHeader
}

const unLike = async (userId, pictureId) => {
	const [ResultSetHeader] = await pool.query(`
			delete From likes where user_id = ? and picture_id = ?
	`, [userId, pictureId])
	// console.log(ResultSetHeader)
	return ResultSetHeader
}

const findLike = async (userId, pictureId) => {
	const [rows] = await pool.query(`
		select count(1) as count From likes where user_id = ? and picture_id = ?
    `, [userId, pictureId]) 
	return rows
}
 

module.exports = {
	like,
	unLike,
	findLike
}