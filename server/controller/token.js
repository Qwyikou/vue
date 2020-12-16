//下载cnpm install jsonwebtoken --save
const JWT = require("jsonwebtoken")
const str = "awerwerwrgtrhrty"

//创建token的方法
function createToken(obj) {
    obj.time = Date.now()
    console.log(obj);
    return JWT.sign(obj, str, { expiresIn: 60 * 60 })
}

//验证token
function verifyToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token,str,(err,data)=>{
            if(err){
                reject("token失效")
            }
            resolve(data)
        })
    })
}
module.exports = {
    createToken,
    verifyToken
}