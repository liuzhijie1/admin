<template>
  <div class="roles">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-button type="primary" @click="addRule">添加角色</el-button>
          </div></el-col
        >
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column type="expand">
          <template slot-scope="prop">
            <role-tree-show :showTree="prop.row" @changAllot="resetThis"></role-tree-show>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="prop">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(prop.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteRole(prop.row.id)"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="AllotRight(prop.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-role ref="showAddRole" @hasChanged="ResetData"></add-role>
    <edit-role
      ref="showEditRole"
      @hasChanged="ResetData"
      :RoleInfo="roleInfo"
    ></edit-role>
    <allot-right ref="showAllot" :allotInfo="allotInfo" @initAllotInfo="initAllotInfo" :ResetData="ResetData"></allot-right>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb";
import RoleTreeShow from "./child/RoleTreeShow";
import AllotRight from './child/AllotRight';
import AddRole from "./child/AddRole";
import EditRole from "./child/EditRole";
import { allRoles, deleteRole } from "network/api";
import { isOk } from "utils/common";
export default {
  data() {
    return {
      list: ["首页", "权限管理", "角色列表"],
      tableData: [],
      roleInfo: {},
      allotInfo:{},
    };
  },
  components: {
    Breadcrumb,
    RoleTreeShow,
    AddRole,
    EditRole,
    AllotRight,
  },
  created() {
    this.getAllRoles();
  },
  methods: {
    async getAllRoles() {
      const data = await allRoles();
      this.tableData = data.data;
      // console.log(data);
    },
    addRule() {
      this.$refs["showAddRole"].dialogVisible = true;
    },
    ResetData() {
      this.getAllRoles();
    },
    editRole(obj) {
      // console.log(obj);
      this.roleInfo = obj;
      this.$refs["showEditRole"].dialogVisible = true;
    },
    deleteRole(id) {
      this.$confirm("确认删除？")
        .then(async (_) => {
          const data = await deleteRole(id);
          isOk(this, data.meta);
          this.ResetData();
        })
        .catch((_) => {});
    },
    AllotRight(obj){
      console.log(obj);
      this.allotInfo=obj;
      this.$refs['showAllot'].dialogVisible = true;
    },
    initAllotInfo(){
      this.allotInfo = {};
    },
    resetThis(id,array){
      // console.log(id);
      // console.log(array);
      this.tableData.forEach((item,index)=>{
        if(item.id == id){
          item.children = array;
        }
      })
    }
  },
};
</script>

<style scoped></style>
