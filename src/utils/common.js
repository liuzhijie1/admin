export const isOk = (_that,{msg,status}) => {
    if(status == 200 || status == 201){
        _that.$message.success(msg);
    }else{
        _that.$message.error(msg);
    }
}