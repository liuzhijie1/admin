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
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        ref="showTree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isOk } from "utils/common";
import {allRight,RoleAuth} from 'network/api';
export default {
  props: {
    allotInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    ResetData:{
      type:Function,
    }
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
      // expandKeys:[101,102,103,125,145,146,110,111,112,107,104,115,121],  这里是多余的可以默认设置全部展开
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
          this.$emit('initAllotInfo');
          this.checkedKeys = [];
          // 处理Ele 组件的内置缓存
          this.$nextTick(()=>{
            this.$refs['showTree'].setCheckedKeys([]);
          })
        })
        .catch((_) => {});
    },
    handleNodeClick(data) {
      console.log(data);
    },
    async getAllRight(){
      const data = await allRight('tree');
      // console.log(data);
      this.data = data.data;
    },
    getAllTreeKey(arr){
      if(!arr.children){
        // console.log(arr.id);
        return this.checkedKeys.push(arr.id);
      }else{
        arr.children.forEach((item,index)=>{
          this.getAllTreeKey(item);
        })
      }
    },
    async submit(){
      // console.log(this.$refs['showTree'].getCheckedKeys());
      // console.log(this.$refs['showTree'].getHalfCheckedKeys());
      this.dialogVisible = false;
      const {getCheckedKeys,getHalfCheckedKeys} = this.$refs['showTree'];
      let rids = [...getCheckedKeys(),...getHalfCheckedKeys()].join(',');
      let userId = this.allotInfo.id;
      const data =await RoleAuth(userId,rids);
      // console.log(data);
      isOk(this,data.meta);
      // 这里可以采用父链和子链的知识去实现
      this.ResetData();
    }
  },
  // this.$nextTick(() => {
  //         this.$refs.tree.setCheckedKeys([])
  //       })
  watch: {
    allotInfo(newValue) {
      // this.data = newValue.children;
      // this.checkedKeys = [];
      // this.$refs['showTree'].setCheckedKeys([]);
      // this.$nextTick(()=>{
      //   this.$refs['showTree'].setCheckedKeys([]);
      // })
      this.okdata = newValue;
      this.getAllTreeKey(newValue);
    },
  },
};
</script>

<style scoped></style>
