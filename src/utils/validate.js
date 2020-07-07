export const validate1 = (rule,value,callback) => {
    let reg = /^1[3456789]\d{9}$/;
    if(reg.test(value)){
        callback();
    }else{
        callback(new Error('请输入正确的电话号码'))
    }
}

