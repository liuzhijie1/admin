<template>
  <div class="editcategories">
    <el-dialog
      title="修改分类"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="修改分类名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="Submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { EditSubmitClassify } from "network/api";
import { isOk } from "utils/common";
export default {
  props: {
    editInfo: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        cat_name: "",
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
      this.$refs["ruleForm"].clearValidate();
      this.ruleForm.cat_name = "";
    },
    async Submit(){
        const result = await EditSubmitClassify(this.editInfo.cat_id,this.ruleForm.cat_name);
        console.log(result);
        isOk(this,result.meta);
        this.$emit('hasChanged')
        this.handleClose();
    }
  },
  watch: {
      editInfo(newValue) {
          this.ruleForm.cat_name = this.editInfo.cat_name;
      }
  },
};
</script>

<style></style>
