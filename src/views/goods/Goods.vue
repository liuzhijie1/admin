<template>
  <div class="goods">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-input
            placeholder="请输入内容"
            v-model="params.query"
            class="input-with-select"
            clearable
            @clear="clearSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SearchGoods"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="6"
          ><el-button type="primary" @click="AddGoods"
            >添加商品</el-button
          ></el-col
        >
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="150">
          <template slot-scope="prop">
            {{ prop.row.add_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="prop">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteGoods(prop.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        :current-page="1"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { AllGoods, DeleteGoods } from "network/api";
import { isOk } from "utils/common";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      list: ["首页", "商品管理", "商品列表"],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  created() {
    this.getAllGoods();
  },
  methods: {
    AddGoods() {
      console.log("添加商品");
      this.$router.push("/goods/add");
    },
    deleteGoods(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await DeleteGoods(id);
          isOk(this, result.meta);
          this.getAllGoods();
        })
        .catch(() => {});
    },
    clearSearch() {
      this.params.query = "";
      this.params.pagenum = 1;
      this.params.pagesize = 10;
      this.getAllGoods();
    },
    SearchGoods() {
      this.getAllGoods();
    },
    async getAllGoods() {
      const data = await AllGoods(this.params);
      console.log(data);
      this.tableData = data.data.goods;
      this.total = data.data.total;
    },
    handleSizeChange(num) {
      this.params.pagesize = num;
      this.getAllGoods();
    },
    handleCurrentChange(num) {
      this.params.pagenum = num;
      this.getAllGoods();
    },
  },
};
</script>

<style scoped>
.el-table {
  font-size: 12px;
}
</style>
