
const pool = require('../db') 

const upload = async (filename, caption, detail) => {	 

	const [ResultSetHeader] = await pool.query(`
	INSERT INTO pictures
		(id, caption, created_by, detail) 
	VALUES 
		(?, ?, ?, ?)
	`, [ filename, caption, 20, detail ])
}


const findPhotoAll = async () => {	 
	const [rows] = await pool.query(`
		select id, caption, created_at, created_by, detail
		from pictures
	`)
	// console.log('===========findPhotoAll===========')
	// console.log(rows)
	return rows
}

module.exports = { 
	upload,
	findPhotoAll
}
