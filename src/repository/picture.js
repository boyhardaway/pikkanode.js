
const pool = require('../db') 

const upload = async (filename, caption, detail, id) => {	 
	//console.log(ctx.session.userId)
	const [ResultSetHeader] = await pool.query(`
	INSERT INTO pictures
		(id, caption, created_by, detail) 
	VALUES 
		(?, ?, ?, ?)
	`, [ filename, caption, id, detail ])
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
	console.log(`%${caption}%`)
	return rows
}

module.exports = { 
	upload,
	findPhotoAll,
	findPhotoById,
	findPhotoByCaption
}
