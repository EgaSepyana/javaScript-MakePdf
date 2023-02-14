const failed = (code, massage = "Failed request", data = undefined) =>{
    return {
        status: code,
        massage: massage,
        data: data    
    }
}

module.exports = {
    failed
}