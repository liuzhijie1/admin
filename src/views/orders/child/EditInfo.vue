<template>
  <div class="edit-info">
    <el-dialog
      title="修改地址"
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
        <el-form-item label="省市区/县" prop="city">
          <el-cascader
            :options="cityOptions"
            :value="ruleForm.city"
            @change="changeProvince"
            clearable
            :props="props"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="ruleForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from "utils/city_data2017_element";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        city: [],
        detail: "",
      },
      cityOptions: cityOptions,
      rules: {
        detail: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择省市区/县", trigger: "blur" }],
      },
      props: {
        checkStrictly: false,
        expandTrigger: "hover",
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
      this.$refs["ruleForm"].clearValidate();
      this.ruleForm.city = [];
      this.ruleForm.detail = "";
    },
    changeProvince(citys) {
      console.log(citys);
    },
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
