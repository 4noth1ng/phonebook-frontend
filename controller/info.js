const {
    exec
} = require('../db/mysql')

const insertInfo = async function(data) {
    let sql
    if(data) {
        const {name, phone, address, email, remark, userid} = data
        sql = `insert into info (name, phone, address, email, remark, userid) values ('${name}', '${phone}', '${address}', '${email}', '${remark}', ${userid});`
    }    
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}
const deleteInfo = async function(id) {
    let sql
    if (id) {
        sql = `delete from info where id=${id}`   
    }
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}
const updateInfo = async function (id,name, phone, address, email, remark, userid) {
    let sql = `update info SET name='${name}', address='${address}', email='${email}', remark='${remark}', phone='${phone}',userid=${userid} where id = ${id};`
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}
const getInfo = async function(userid) {
    let sql = `select * from info where userid = ${userid}`
    return await exec(sql)
}
module.exports = {
    insertInfo,
    deleteInfo,
    updateInfo,
    getInfo
}