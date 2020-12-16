//引入db模块
const { requestQuery, connection } = require("../database/db");

// 格式化事件   cnpm install moment --save
const moment = require("moment")

// 随机用户名
const stringRandom = require("string-random")
//加密模块
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

//令牌
const JWT = require("./token")
// JWT.createToken()
const { iHuyi } = require("./HUAQIAN")


const svgCaptcha = require('svg-captcha');

// 定义变量来临时存储手机号
var tempPhone = null;
// 定义变量存储临时手机验证码
var tempCode = null;
// 定义变量存储随机验证码
var tempCaptcha = null;





// 用户列表
exports.UserList = async (req, res) => {
    const userSql = "SELECT * from hg_users where is_show=1"
    const UserList = await requestQuery(userSql)
    res.json({
        data: UserList
    })
}

//用户注册
exports.UserRegister =async (req, res) => {
    //需要post 发送的数据
    console.log(req.body);
    let user_name = req.body.user_name;
    let login_password = req.body.login_password
    let phone = req.body.phone
    let sql_name = "SELECT user_name from hg_users WHERE user_name=? AND is_show=1"

    // 获取当前时间
    let nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(nowDate);
    connection.query(sql_name, user_name, (err, result_name) => {
        if (err) {
            return res.json({
                msg: "用户注册失败",
                status: 1001,
                data: err,
            })
        }
        //需求:用户名存在不能注册,用户名不存在手机号存在也不能注册
        //如果result_name为空说明用户不存在,说明用户名可以使用
        if (result_name == "") {//条件成立说明用户名不存在
            //验证手机号是否存在
            let sql_phone = "SELECT phone from hg_users WHERE phone=? AND is_show=1"
            connection.query(sql_phone, phone, (err, result_phone) => {
                if (err) {
                    return res.json({
                        msg: "用户注册失败",
                        status: 1002,
                        data: err,
                    })
                }
                //如果result_phone为空说明该手机号可用
                if (result_phone == "") {
                    let sql_register = `INSERT INTO hg_users SET user_name=?,login_password=?,phone=?,is_show=1,create_time="${nowDate}"`
                    //给密码加密
                    const hashpassword = bcrypt.hashSync(login_password, salt);
                    connection.query(sql_register, [user_name, hashpassword, phone], (err, result) => {
                        if (err) {
                            return res.json({
                                msg: "用户注册失败",
                                status: 1003,
                                data: err,
                            })
                        }
                        console.log(result);
                        if (result.affectedRows == 1) {
                            return res.json({
                                msg: "恭喜您注册成功,可以登陆了",
                                status: 200,
                                dats: result
                            })
                        } else {
                            return res.json({
                                msg: "用户注册失败",
                                status: 1004,
                                dats: err
                            })
                        }
                    })
                } else {
                    return res.json({
                        msg: "该手机号已经存在,请更换手机号注册",
                        status: 500
                    })
                }
            })
        } else {
            return res.json({
                msg: "该用户名已经存在,请更换用户名注册",
                status: 500
            })
        }

    })

}

//用户登录
exports.UserLogin = async (req, res) => {
    //需要post发送数据
    const user_name = req.body.user_name
    const captcha = req.body.captcha.toLowerCase()

    if(captcha != tempCaptcha){
        return res.json({
            status:4004,
            msg:"验证码不正确"
        })
    }
    console.log(req.body);
    //先判断用户名是否存在
    const sql = `SELECT user_name,login_password FROM hg_users WHERE user_name=? AND is_show=1`
    connection.query(sql, [user_name], (err, result) => {
        if (err) {
            return res.json({
                msg: "数据库查询失败",
                status: 500,
            })
        }
        if (result == "") {
            return res.json({
                msg: "该用户不存在,去注册吧",
                status: 1004
            })
        } else {
            console.log(result);
            const login_password = bcrypt.compareSync(req.body.login_password, result[0].login_password)
            // console.log(login_password);
            //login_password是一个布尔值 true 或  false
            if (login_password !== true) {
                return res.status(500).json({
                    msg: "密码错误,请重新输入",
                })
            } else {
                let token = JWT.createToken({
                    login: true,
                    user_name
                })
                return res.json({
                    status: 200,
                    msg: "登陆成功",
                    data: result,
                    token: token,
                })
            }
        }
    })
}

// 验证码接口
exports.GetIdentifyingCode = async (req, res) => {
    // 第一步,输入正确手机号
    // 第二步,点击获取验证码发送请求
    // 第三步,短信内容+随机验证码
    console.log(req.body);
    for (var keys in req.body) {
        var phone = keys
        tempPhone = keys;//临时手机号变量赋值
    }
    var identCode = ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
    tempCode = identCode;
    console.log(tempPhone);
    // let MessageContent = "您的验证码是：" + identCode + "。请不要把验证码泄露给其他人。";
    // iHuyi.send(phone, MessageContent, function (err, smsId) {
    //     if (err) {
    //         console.log(err.message);
    //     } else {
    //         res.json({
    //             msg: "验证码发送成功",
    //             status: 200,
    //             data: identCode
    //         })
    //         console.log('SMS sent,and smsId is' + smsId);
    //     }
    // });


    res.json({
        msg: "验证码发送成功",
        status: 200,
        data: identCode
    })
}
// 短信登录
exports.PhoneLogin = async (req, res) => {
    console.log(req.body);
    // console.log(req.body.phone);
    // console.log(1111);
    // console.log(req.body.captcha);
    // console.log(req.body.tempCode);
    // console.log(req.body.tempPhone);
    // console.log(2222);
    // console.log(req.body);
    var phone = req.body.phone;
    console.log(phone+"1231231231");
    var code = req.body.code;
    var captcha = req.body.captcha.toLowerCase();
    if (code != tempCode) {
        return res.json({
            status: 4002,
            msg: "短信验证码错误"
        })
    } else if (phone != tempPhone) {
        return res.json({
            status: 4003,
            mag: "手机号不正确"
        })
    } else if (captcha != tempCaptcha) {
        return res.json({
            status: 4004,
            mag: "随机验证码不正确"
        })
    } else {
        // 判断手机号是否存在
        // 如果不存在,将输入的手机号注册成为用户
        const sql_phone = "SELECT * from hg_users WHERE phone=? AND is_show =1"
        const phone_result = await requestQuery(sql_phone, phone)
       
        console.log(phone_result);//如果手机号存在得到一个数组
        console.log(22222);
        if (phone_result.length == 0) {//如果条件成立说明手机号不存在
            //手机号不存在要注册一个账号
            //需要随机生成一个用户名
            const user_name = "hg_" + stringRandom(10)
            console.log(user_name);
            //获取当前时间
            let nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(nowDate);
            // let sql_register = `INSERT INTO hg_users (user_name,phone,is_show,create_time) VALUES ("${user_name}",${phone},"1",${nowDate}")`
           var sql_register =  `INSERT INTO hg_users SET user_name=?,login_password=?,phone=?,is_show=1,create_time="${nowDate}"`
            let phoneRegister = await requestQuery(sql_register)
            console.log(123456789);
            console.log(phoneRegister);
            let result = await requestQuery(sql_phone, phone)
            console.log(3333333333333);
            console.log(result);
            if (phoneRegister.affectedRows == 1) {
                let token = JWT.createToken({
                    login: true,
                    phone: result[0].phone
                })
                return res.json({
                    status: 200,
                    msg: "登陆成功",
                    data: result,
                    token: token
                })
            } else {
                return res.json({
                    status: 500,
                    msg: "服务器出错",
                })
            }



        } else {
            // 如果手机号存在直接登录
            let token = JWT.createToken({
                login: true,
                phone: phone_result[0].phone
            })
            return res.json({
                status: 200,
                msg: "登陆成功",
                data: phone_result,
                token: token
            })
        }

    }
}


exports.svgCaptcha = async (req, res) => {
    var captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 3,
        color: true,
        background: '#fff',
    })
    tempCaptcha = captcha.text.toLowerCase()
    res.type('svg')
    res.status(200).send(captcha.data);
    console.log(captcha.text);//验证码内容
}