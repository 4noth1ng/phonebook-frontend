const {
    exec
} = require('../db/mysql')


const getBlogs = async function (page, limit, blogType) {
    let sql = `select * from blogs where 1=1 `
    if (blogType !== '0') {
        sql += `and blogType=${blogType} `
    }
    sql += `order by createtime desc `
    const limitPage = (page - 1) * limit
    if (page && limit) {
        sql += `LIMIT ${limitPage},${limit} `
    }
    return await exec(sql)
}

const getBlogDetail = async function (blogId) {
    let sql = `select * from blogs where 1=1 `
    if (blogId) {
        sql += `and id=${blogId}`
    }
    return await exec(sql)
}

const getBlogsByTitle = async function (keyword) {
    let sql = `select * from blogs where 1=1 `
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += 'order by createtime desc'
    return await exec(sql)
}

const publishBlogs = async function (data) {
    let sql
    if (data) {
        const {
            title,
            content,
            createtime,
            blogType,
            blogText
        } = data
        console.log(title, content, createtime);
        sql = `insert into blogs(title,content,createtime,blogType,blogText) values('${title}','${content}',${createtime},${blogType},'${blogText}')`
    }
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}

const deleteBlogs = async function (blogId) {
    let sql
    if (blogId) {
        sql = `delete from blogs where id=${blogId}`   
    }
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}

const blogsLength = async function (blogType,keyword) {
    let sql = `select COUNT(*) from blogs where 1=1 `
    if (blogType !== '0') {
        sql+=`and blogType=${blogType} `
    }
    if (keyword) {
        sql+=`and title like '%${keyword}%'`
    }
    const result = await exec(sql)
    return result
}

const getBlogByType = async function (blogType) {
    let sql = `select * from blogs where 1=1 `
    if (blogType) {
        sql+=`and blogType=${blogType} `
    }
    sql += `order by createtime desc`
    return await exec(sql)
}

const updateBlog = async function (title,content,createtime,blogType,blogText,id) {
    let sql = `update blogs SET title='${title}',content='${content}',createtime=${createtime},blogType=${blogType},blogText='${blogText}' where id=${id}`
    const result = await exec(sql)
    if (result.affectedRows) {
        return true
    }
    return false
}

module.exports = {
    getBlogs,
    getBlogDetail,
    getBlogsByTitle,
    publishBlogs,
    deleteBlogs,
    blogsLength,
    getBlogByType,
    updateBlog
}