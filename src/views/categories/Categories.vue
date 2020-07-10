<template>
  <div class="categories">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="showAddCategories">添加分类</el-button>
      <zk-table
        :data="tableData"
        :columns="columns"
        index-text="#"
        :show-index="true"
        :border="true"
        :selection-type="false"
        :expand-type="false"
      >
        <template slot="isOk" slot-scope="prop">
          <i
            class="el-icon-success"
            style="color:#90ee90"
            v-if="!prop.row.cat_deleted"
          ></i>
          <i class="el-icon-error" style="color:red" v-else></i>
        </template>
        <template slot="tags" slot-scope="prop">
          <el-tag v-if="prop.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag
            type="success"
            v-else-if="prop.row.cat_level === 1"
            size="mini"
            >二级</el-tag
          >
          <el-tag type="warning" v-else size="mini">三级</el-tag>
        </template>
        <template slot="operations">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </zk-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <add-categories
        ref="addCategoriesDialog"
        @hasChanged="refreshDate"
      ></add-categories>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import AddCategories from "./child/AddCategories";
import { AllCategories } from "network/api";
export default {
  components: {
    Breadcrumb,
    AddCategories,
  },
  data() {
    return {
      list: ["首页", "商品管理", "商品分类"],
      params: {
        type: "",
        pagenum: 1,
        pagesize: 5,
      },
      tableData: [],
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "isOk",
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "tags",
        },
        {
          label: "操作",
          type: "template",
          template: "operations",
        },
      ],
    };
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      const data = await AllCategories(this.params);
      // console.log(data);
      this.total = data.data.total;
      this.tableData = data.data.result;
    },
    showAddCategories() {
      this.$refs["addCategoriesDialog"].dialogVisible = true;
    },
    refreshDate() {
      // console.log("123");
      this.params.pagenum = 1;
      this.params.pagesize = 5;
      this.getAllCategories();
    },
    handleSizeChange(num){
      // console.log('每页的大小改变');
      this.params.pagesize = num;
      this.getAllCategories();
    },
    handleCurrentChange(num){
      // console.log('当前的页数改变');
      this.params.pagenum = num;
      this.getAllCategories();
    }
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>
