const pool = require('../db')

const register = async (email, password, facebook_user_id, first_name, last_name) => {
 
	let ResultSetHeader 
    if (await checkHasEmail(email) < 1){ 
	    [ResultSetHeader] = await pool.query(`	
				INSERT INTO users(email, password,
				facebook_user_id, firstname, lastname) 
				VALUES (?, ?,
						?, ?, ?)  `, 
			[email, password, facebook_user_id, first_name, last_name]) 
			console.log(1)
	}else{ 
		[ResultSetHeader] = await pool.query(`	
				Update users 
				set password = ?,
				facebook_user_id = ?,
				firstname = ?,
				lastname = ? 
				where email = ? `, 
			[password, facebook_user_id, first_name, last_name, email]) 
			console.log(2)
	}
	
	// คำสั่ง pool คือ เอา connection มาใช้แล้วเก็บไว้ reusage ไม่ได้ทำลายทิ้ง
	// ถ้าคำสั่ง getConnection มันจะใช้ตัวเดิม
	// console.log(ResultSetHeader.insertId)
	// let [rows] = await pool.query(`select max(u.id) as id from users as u `)
	console.log(ResultSetHeader)
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

async function checkHasEmail(email){
	const [rows] = await pool.query(`select count(1) as count from users where email = ? `, [email])
	console.log(parseFloat(rows[0].count))
	return parseFloat(rows[0].count)
}


module.exports = {
	register,
	checkSignin
}