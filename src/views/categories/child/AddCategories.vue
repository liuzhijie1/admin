<template>
  <div class="addCategories">
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="par_cat">
          <el-cascader
            v-model="ruleForm.par_cat"
            :options="options"
            :props="props"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AllCategories,AddCatrgoried } from "network/api";
import {isOk} from 'utils/common';
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        cat_name: "",
        par_cat: [],
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      options: [],
      props: {
        checkStrictly: true,
        label: "cat_name",
        value: "cat_id",
      },
    };
  },
  created() {
    this.getTypeTwo();
  },
  methods: {
    handleClose() {
      console.log("取消对话框");
      this.dialogVisible = false;
      this.$nextTick((_) => {
        this.$refs["ruleForm"].resetFields();
        this.$refs["ruleForm"].clearValidate();
      });
    },
    async getTypeTwo() {
      const data = await AllCategories({ type: 2 });
      // console.log(data);
      this.options = data.data;
    },
    async submit(){
      let data = {
        cat_pid : this.ruleForm.par_cat[this.ruleForm.par_cat.length-1] || 0,
        cat_name : this.ruleForm.cat_name,
        cat_level : this.ruleForm.par_cat.length,
      }
      const result = await AddCatrgoried(data);
      isOk(this,result.meta);
      this.getTypeTwo();
      this.$emit('hasChanged');
      this.handleClose();
    }
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
