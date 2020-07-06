<template>
  <div class="users">
    <Breadcrumb :list="breadList"></Breadcrumb>
    <div class="info">
      <el-card class="box-card">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-input placeholder="请输入内容" v-model="params.query" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6"
            ><el-button type="primary">添加用户</el-button></el-col
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
                inactive-color="#eee">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
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
                type="warning"
                icon="el-icon-star-off"
                size="mini"
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
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
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
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { getUsers } from "network/api";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
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
    async getusers() {
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
      this.totalNum = data.data.total;
    },
    async handleSizeChange(num) {
      // console.log('handleSizeChange'+'    ',num);
      this.params.pagesize = num;
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
    },
    async handleCurrentChange(num) {
      // console.log('handleCurrentChange     '+num);
      this.params.pagenum = num;
      let data = await getUsers(this.params);
      // console.log(data);
      this.tableData = data.data.users;
    },
    // 自己添加的
    async searchUser(){
      // console.log('搜索用户');
      let data =await getUsers(this.params)
      this.tableData = data.data.users;
      // console.log(data);
    }
  },
};
</script>

<style>
.el-table {
  margin-top: 20px;
  font-size: 12px;
}
</style>
