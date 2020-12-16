//下载mysql模块
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',//域名或者IP地址
    user: 'root',//用户名
    password: '',//mysql数据库的密码
    database: 'shop',//连接数据库的名字
});
// console.log(connection);

// const userSql = "SELECT * from hg_users";

// connection.query(userSql, (err, data) => {
//     if (!err) {
//         console.log(data);
//     }
// })

//封装查询方法,给不同的sql查询对应的数据
function requestQuery(sql, sqlArr) {
    return new Promise((resolve, reject) => {
        connection.query(sql, sqlArr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
//暴露
module.exports = {
    connection,
    requestQuery
}