const {
    exec
} = require('../db/mysql')
const crypto = require("crypto"),
    jwt = require("jsonwebtoken");

const userLogin = async function (data) {
    let { username, password } = data
    password = crypto.createHash('md5').update(password).digest('hex')
    let sql = `select username,id from users where username='${username}' and password='${password}'`
    const result = await exec(sql)
    return result[0] || {}
}

const userRegister = async function (data) {
    let { username, password } = data
    password = crypto.createHash('md5').update(password).digest('hex')
    let sql = `INSERT INTO users SET username='${username}',password='${password}'`
    const result = await exec(sql)
    if (result.affectedRows) return true
    return false
}

module.exports = {
    userLogin,
    userRegister
}