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
        <template slot="operations" slot-scope="prop">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEdit(prop.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteC(prop.row.cat_id)"
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
      <EditCatrgories
        ref="showEditDialog"
        :editInfo="editInfo"
        @hasChanged="getAllCategories"
      ></EditCatrgories>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import AddCategories from "./child/AddCategories";
import EditCatrgories from "./child/EditCatrgories";
import { AllCategories, DeleteClassify } from "network/api";
import { isOk } from "utils/common";
export default {
  components: {
    Breadcrumb,
    AddCategories,
    EditCatrgories,
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
      editInfo: {},
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
    handleSizeChange(num) {
      // console.log('每页的大小改变');
      this.params.pagesize = num;
      this.getAllCategories();
    },
    handleCurrentChange(num) {
      // console.log('当前的页数改变');
      this.params.pagenum = num;
      this.getAllCategories();
    },
    showEdit(obj) {
      console.log(obj);
      this.editInfo = obj;
      this.$refs["showEditDialog"].dialogVisible = true;
    },
    deleteC(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await DeleteClassify(id);
          console.log(result);
          isOk(this, result.meta);
          this.getAllCategories();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });  
        });
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>
