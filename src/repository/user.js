const pool = require('../db')

const register = async (email, password, facebook_user_id, first_name, last_name) => {
	let res
	let ResultSetHeader 
    if (await checkHasSignup(email) < 1){ 
	    [ResultSetHeader] = await pool.query(`	
				INSERT INTO users(email, password,
				facebook_user_id, firstname, lastname) 
				VALUES (?, ?,
						?, ?, ?) `, [email, password, facebook_user_id, first_name, last_name])  
		res = ResultSetHeader.insertId
	}else{  
		if (facebook_user_id) { 
			[ResultSetHeader] = await pool.query(`Update users 
								set facebook_user_id = ?,
								firstname = ?,
								lastname = ? 
								where email = ? `, [facebook_user_id, first_name, last_name, email])  
			// console.log(ResultSetHeader)
			res = ResultSetHeader.changedRows
		}else{
			[ResultSetHeader] = await pool.query(`Update users 
								set password = ?
								where email = ? `, [password, email])
			console.log(ResultSetHeader)
			res = ResultSetHeader.changedRows
		}		
		// res = ResultSetHeader.changedRows
	}
	// console.log(res)
	// คำสั่ง pool คือ เอา connection มาใช้แล้วเก็บไว้ reusage ไม่ได้ทำลายทิ้ง
	// ถ้าคำสั่ง getConnection มันจะใช้ตัวเดิม
	// console.log(ResultSetHeader.insertId)
	// let [rows] = await pool.query(`select max(u.id) as id from users as u `)
	// console.log(ResultSetHeader)
	return res
}

const checkSignin = async (email) => {
	const [rows] = await pool.query(`
	SELECT id, password
	FROM users 
	WHERE email = ?
	`, [email])
	return rows
}

async function checkHasSignup(email){
	const [rows] = await pool.query(`select count(1) as count from users where email = ?`, [email])  // and (facebook_user_id = '' or password = '') 
	return parseFloat(rows[0].count)
}

const findUserById = async (id) => {
	const [rows] = await pool.query(`
		SELECT id, email, password, created_at, facebook_user_id, firstname, lastname 
		FROM users 
		WHERE id = ? or facebook_user_id = ?
	`, [id, id])
	return rows
}

const editProfile = async (email, password, facebook_user_id, first_name, last_name) => {
 
	let ResultSetHeader 
	[ResultSetHeader] = await pool.query(`Update users 
						set facebook_user_id = ?,
						firstname = ?,
						lastname = ?,
						password = ?
						where email = ? `, [facebook_user_id, first_name, last_name, password, email])  
	console.log(ResultSetHeader) 
	return ResultSetHeader.changedRows
}

module.exports = {
	register,
	checkSignin,
	findUserById,
	editProfile
}