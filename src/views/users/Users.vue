<template>
  <div class="users">
    <Breadcrumb :list="breadList"></Breadcrumb>
    <div class="info">
      <el-card class="box-card">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-input placeholder="请输入内容" v-model="params.query" class="input-with-select" clearable @clear="AllUser">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6"
            ><el-button type="primary" @click="showAddDialog">添加用户</el-button></el-col
          >
        </el-row>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="props">
              <el-switch
                v-model="props.row.mg_state"
                active-color="#409eff"
                @change="changeState(props.row)"
                inactive-color="#eee">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(props.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUsers(props.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="设置"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </el-card>
    </div>
    <add-user-dialog  ref="dialog" @hasAdd="AllUser"></add-user-dialog>
    <edit-user-dialog ref="editlog" :userinfo="userinfo" @hasAdd="AllUser"></edit-user-dialog>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import AddUserDialog from './child/AddUserDialog';
import EditUserDialog from './child/EditUserDialog'
import { getUsers,changeUserState,deleteUser } from "network/api";
import {isOk} from 'utils/common'
export default {
  components: {
    Breadcrumb,
    AddUserDialog,
    EditUserDialog
  },
  data() {
    return {
      userinfo:{},
      isShow:false,
      breadList: ["首页", "用户管理", "用户列表"],
      tableData: [],
      currentPage4: 1,
      params: {
        query:'',
        pagenum: 1,
        pagesize: 2,
      },
      totalNum: 0,
      value:true,
    };
  },
  created() {
    this.getusers();
  },
  methods: {
    // 请求所有用户的数据
    async getusers() {
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
      this.totalNum = data.data.total;
    },
    // 处理分页器中的显示页数的改变
    async handleSizeChange(num) {
      // console.log('handleSizeChange'+'    ',num);
      this.params.pagesize = num;
      
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
    },
    // 分页器处理当前页数的改变
    async handleCurrentChange(num) {
      // console.log('handleCurrentChange     '+num);
      this.params.pagenum = num;
      this.currentPage4 = num;
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
    },
    // 搜索用户，并且对表格数据进行了重新的赋值
    async searchUser(){
      // console.log('搜索用户');
      let data =await getUsers(this.params)
      this.tableData = data.data.users;
      // console.log(data);
    },
    // 回到第一页，并且重新请求数据
    AllUser(){
      // console.log('这里重新请求了');
      this.params.pagenum = 1;
      this.getusers();
      this.currentPage4 = 1;
    },
    // 改变用户的状态
    async changeState(state){
      // console.log(state);
      const data = await changeUserState(state.id,state.mg_state)
      if(data.meta.status !== 200) return this.$message.error('设置状态失败')
      this.$message.success(data.meta.msg);
    },
    // 显示添加按钮
    showAddDialog(){
      this.$refs['dialog'].dialogVisible = true;
    },
    // 显示编辑按钮，并且为子组件传值
    showEditDialog(obj){
      // console.log(obj);
      this.userinfo = obj;
      this.$refs['editlog'].dialogVisible = true;
    },
    // 删除用户并且重新刷新
    async deleteUsers(obj){
      // console.log(obj);
      const data = await deleteUser(obj.id);
      // console.log(data);
      isOk(this,data.meta.status,data.meta.msg);
      this.AllUser();
    }
  },
};
</script>

<style scoped>
</style>
