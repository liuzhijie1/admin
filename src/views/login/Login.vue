<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-img">
        <img src="~assets/img/logo.png" alt="" />
      </div>
      <div class="login-box-content">
        <el-form ref="form" :model="userForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              autocomplete="off"
              v-model="userForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "network/api";
import storage from "good-storage";
export default {
  data() {
    return {
      userForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "请输入3到10位的字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "请输入3到10位密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
        // 这里是采用promise 但是推荐使用 async 和 await 一起使用
          reqLogin(this.userForm).then((data) => {
            console.log(data);
            if (data.meta.status === 200) {
              storage.session.set("token", data.data.token);
              this.$message({
                message: "恭喜您登录成功",
                type: "success",
              });
              this.$router.replace('/home');
            } else {
              this.$message({
                message: data.meta.msg,
                type: "warning",
              });
            }
          });
        } else {
          this.$message.error("请检查输入");
          return false;
        }
      });
    },
    reset() {
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    height: 300px;
    width: 450px;
    border-radius: 5px;
    background: whitesmoke;
    position: relative;
    .login-box-img {
      width: 130px;
      border: 1px solid #eee;
      height: 130px;
      padding: 10px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      background: whitesmoke;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px #ddd;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.el-form {
  margin-top: 100px;
  padding: 20px;
}
.btn {
  text-align: right;
}
</style>
