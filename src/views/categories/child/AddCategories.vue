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
            :options="options"
            :props="props"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AllCategories } from "network/api";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        cat_name: "",
        par_cat: "",
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      options: [],
      props: {
        checkStrictly: true,
        label:'cat_name',
        value: 'id',
      },
    };
  },
  created() {
    this.getTypeTwo();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async getTypeTwo() {
      const data = await AllCategories({ type: 2 });
      console.log(data);
      this.options = data.data;
    },
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
