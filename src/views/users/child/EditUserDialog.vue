<template>
  <el-dialog
    title="修改用户"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="EditUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validate1 } from "utils/validate";
import { editUser } from "network/api";
import {isOk} from 'utils/common'
export default {
  props: {
    userinfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        username: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: validate1, trigger: "blur" },
        ],
      },
    };
  },
  watch: {
      userinfo(newValue) {
          this.ruleForm.username = newValue.username;
          this.ruleForm.mobile = newValue.mobile;
          this.ruleForm.email = newValue.email;
      }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
        })
        .catch((_) => {
          //   console.log("no");
        });
    },
    EditUser() {
      let _this = this;
      this.$refs["ruleForm"].validate(async (bool) => {
        if (bool) {
          _this.dialogVisible = false;
            const data = await editUser({id:this.userinfo.id,...this.ruleForm});
            isOk(this,data.meta);
          _this.$refs["ruleForm"].resetFields();
          _this.$emit("hasAdd");
        }
      });
    },
  },
};
</script>

<style></style>
