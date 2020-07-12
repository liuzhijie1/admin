<template>
  <div class="params-table">
    <el-row>
      <el-col :span="10">
        <el-button type="primary" @click="showMyDialog" :disabled="ID == -1">
          {{ "添加" + ActiveName }}
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template slot-scope="prop">
          <template
            v-if="prop.row.listTags.length > 0"
          >
            <el-tag
              :key="tag"
              v-for="(tag, index) in prop.row.listTags"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(prop.row, index)"
              >{{ tag }}</el-tag
            >
          </template>
          <el-input
            class="input-new-tag"
            v-if="prop.row.inputVisible"
            v-model="prop.row.inputValue"
            ref="saveTagInput"
            size="small"
            style="width:100px"
            @keyup.enter.native="handleInputConfirm(prop.row)"
            @blur="handleInputConfirm(prop.row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(prop.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" label="参数名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="prop">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="EditDialog(prop.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DeleteDialog(prop.row.attr_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="AddOrEdit + ActiveFullName"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item :label="ActiveFullName" prop="attribute" width="100%">
          <el-input v-model="ruleForm.attribute"></el-input>
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
import {
  getAllAttributes,
  AddAttribute,
  EditSubmitAttribute,
  DeleteAttribute,
} from "network/api";
import { isOk } from "utils/common";
export default {
  props: {
    activeName: {
      type: String,
    },
    ID: {
      type: Number,
    },
    flag: {
      type: Boolean,
    },
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      editInfo: {},
      ruleForm: {
        attribute: "",
      },
      rules: {
        attribute: [
          {
            required: true,
            message: "请输入参数名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async handleInputConfirm(obj) {
      let inputValue = obj.inputValue;
      if (inputValue) {
        obj.listTags.push(inputValue);
      }else{
        return ;
      }
      let temp = {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.listTags.join(" "),
      }
      const result = await EditSubmitAttribute(this.ID,obj.attr_id,temp);
      isOk(this,result.meta);
      obj.inputVisible = false;
      obj.inputValue = '';
    },
    showInput(obj) {
      obj.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showMyDialog() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.editInfo = {};
      this.$refs["ruleForm"].resetFields();
      this.$refs["ruleForm"].clearValidate();
      this.ruleForm.attribute = "";
    },
    async handleCloseTag(obj, index) {
      //   console.log(obj, index);
      obj.listTags.splice(index, 1);
      let temp = {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.listTags.join(" "),
      };
      const result = await EditSubmitAttribute(this.ID, obj.attr_id, temp);
      isOk(this, result.meta);
      // obj.listTags.pop();
    },
    EditDialog(obj) {
      //   console.log(obj);
      this.editInfo = obj;
      this.dialogVisible = true;
      this.ruleForm.attribute = obj.attr_name;
    },
    async DeleteDialog(attrid) {
      // console.log(attrid);
      const result = await DeleteAttribute(this.ID, attrid);
      this.getMyAttribute();
    },
    async submit() {
      let obj = {
        attr_name: this.ruleForm.attribute,
        attr_sel: this.activeName,
      };
      if (this.AddOrEdit == "添加") {
        const result = await AddAttribute(this.ID, obj);
        this.getMyAttribute();
        this.handleClose();
      } else {
        const result = await EditSubmitAttribute(
          this.ID,
          this.editInfo.attr_id,
          obj
        );
        this.getMyAttribute();
        this.handleClose();
      }
    },
    async getMyAttribute() {
      const result = await getAllAttributes(this.ID, { sel: this.activeName });
      //   这里有个大Bug ，只有Data中的数据具有响应式的特点，所以在设置data之前，设计好数据，而不是之后设置。
      result.data.forEach((item, index) => {
        if(item.attr_vals){
          item.listTags = item.attr_vals.split(" ");
        }else{
          item.listTags = [];
        }
        item.inputValue = "";
        item.inputVisible = false;
      });
      this.tableData = result.data;
      console.log(result);
    },
  },
  computed: {
    ActiveName() {
      return this.activeName == "many" ? "参数" : "属性";
    },
    ActiveFullName() {
      return this.activeName == "many" ? "动态参数" : "静态属性";
    },
    AddOrEdit() {
      return !!this.editInfo.attr_id ? "修改" : "添加";
    },
  },
  watch: {
    activeName(newValue) {
      if (this.ID == -1 || this.flag == true) {
        this.tableData = [];
        return;
      }
      this.getMyAttribute();
    },
    ID(newValue) {
      if (this.ID == -1 || this.flag == true) {
        this.tableData = [];
        return;
      }
      this.getMyAttribute();
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 10px 10px;
}
</style>
