<template>
  <div class="add-role">
    <el-dialog
      title="分配权限"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        @node-click="handleNodeClick"
        :default-expanded-keys="expandKeys"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      >
      </el-tree>
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
import { isOk } from "utils/common";
import {allRight} from 'network/api';
export default {
  props: {
    allotInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      data: [],           //展示的树形数据,
      okdata:[],          //从父级传过来的选中数据
      defaultProps: {
        children: "children",
        label: "authName",
      },
      expandKeys:[101,102,103,125,145,146,110,111,112,107,104,115,121],
      checkedKeys:[],
    };
  },
  created () {
    this.getAllRight();
  },
  methods: {
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
        })
        .catch((_) => {});
    },
    handleNodeClick(data) {
      console.log(data);
    },
    async getAllRight(){
      const data = await allRight('tree');
      console.log(data);
      this.data = data.data;
    }
  },
  watch: {
    allotInfo(newValue) {
      // this.data = newValue.children;
      this.okdata = newValue.children;
    },
  },
};
</script>

<style scoped></style>
