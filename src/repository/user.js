const pool = require('../db')
const bcrypt = require('bcrypt')

const register = async (email, password) => {	 

	const [ResultSetHeader] = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [ email, password ])
	// คำสั่ง pool คือ เอา connection มาใช้แล้วเก็บไว้ reusage ไม่ได้ทำลายทิ้ง
	// ถ้าคำสั่ง getConnection มันจะใช้ตัวเดิม
	// console.log(ResultSetHeader.insertId)
	// let [rows] = await pool.query(`select max(u.id) as id from users as u `)
	return ResultSetHeader.insertId
}

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
	register,
	upload,
	findPhotoAll
}
