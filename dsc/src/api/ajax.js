//二次封装axios
import Axios from "axios"

export default function ajax(url = "", params = {}, type = "get") {
    let promise = null
    return new Promise((resolve, reject) => {
        //判断请求数据的方式
        if (type === "get") {
            //http://localhost:3000?username=llr&age=10
            // prams = {
            //     username: "llr",
            //     age: 10
            // }
            let paramsStr = ""   //
            Object.keys(params).forEach(key => {
                paramsStr += key + "=" + params[key] + "&"
            })
            if (paramsStr != "") {
                // paramsStr = paramsStr.slice(0, -1)
                paramsStr = paramsStr.slice(0, paramsStr.lastIndexOf("&"))
            }
            url = url + "?" + paramsStr
            promise = Axios.get(url)
        } else if (type === "post") {
            promise = Axios.post(url, params)
        }

        promise.then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })


    })
}


// ajax("http://localhost:3000", {
//     username: "llr",
//     age: 10
// }, "get")

// const ajax = function () {

// }

// export default ajax



