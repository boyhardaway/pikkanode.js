const pool = require('../db')

const register = async (email, password) => {

	const [ResultSetHeader] = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [email, password])
	// คำสั่ง pool คือ เอา connection มาใช้แล้วเก็บไว้ reusage ไม่ได้ทำลายทิ้ง
	// ถ้าคำสั่ง getConnection มันจะใช้ตัวเดิม
	// console.log(ResultSetHeader.insertId)
	// let [rows] = await pool.query(`select max(u.id) as id from users as u `)
	return ResultSetHeader.insertId
}

const checkSignin = async (email) => {
	const [rows] = await pool.query(`
	SELECT id, password
	FROM users 
	WHERE email = ?
	`, [email])
	return rows
}


module.exports = {
	register,
	checkSignin
}