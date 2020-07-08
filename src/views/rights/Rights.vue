<template>
  <div class="rights">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="400">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="400">
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="props">
          <el-tag :type="types[props.row.level].type" plain>{{types[props.row.level].content}}</el-tag>
          </template>
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import {allRight} from 'network/api';
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      list: ["首页", "权限管理", "权限列表"],
      tableData: [],
      types:{ 
        '0':{type:'primary',content:'一级'},
        '1':{type:'success',content:'二级'},
        '2':{type:'warning',content:'三级'}
      }
    };
  },
  created () {
    this.getAllRights();
  },
  methods: {
    async getAllRights() {
      const data = await allRight('list');
      // console.log(data);
      this.tableData = data.data;
    }
  },
};
</script>

<style scoped>

</style>
