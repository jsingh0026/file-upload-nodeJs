module.exports = (message, status, data) => {
    if(status){
        return{
            message: message,
            success: status,
            data: data
        }
    }
    else {
        return{
            errorMessage: message,
            success: status,
            error: data
        }
    }
}