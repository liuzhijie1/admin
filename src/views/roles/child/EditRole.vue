<template>
  <div class="add-role">
    <el-dialog
      title="添加角色"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editRoles } from "network/api";
import { isOk } from "utils/common";
export default {
  props: {
    RoleInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        roleName: "",
        roleDesc: "",
      },
      userId:'',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$refs["ruleForm"].resetFields();
          this.dialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
    async EditRole() {
      this.dialogVisible = false;
      const data = await editRoles(this.userId,this.ruleForm);
      isOk(this,data.meta);
      this.$emit('hasChanged')
    },
  },
  watch: {
    RoleInfo(newValue) {
      this.userId = newValue.id;
      this.ruleForm.roleName = newValue.roleName;
      this.ruleForm.roleDesc = newValue.roleDesc;
    },
  },
};
</script>

<style scoped></style>
