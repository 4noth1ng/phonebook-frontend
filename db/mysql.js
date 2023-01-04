const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db.js')

const con = mysql.createConnection(MYSQL_CONF)
con.connect()

//封装 SQL
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)

        })
    })
    return promise
    
}

module.exports = {
    exec
}