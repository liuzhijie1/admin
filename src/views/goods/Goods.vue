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
        <el-table-column prop="goods_name" label="商品名称" width="700">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="150">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="10"
        :current-page="1"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="150"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { AllGoods } from "network/api";
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
    };
  },
  created() {
    this.getAllGoods();
  },
  methods: {
    AddGoods() {
      console.log("添加商品");
    },
    clearSearch() {
      console.log("清除搜索数据，重新请求");
    },
    SearchGoods() {
      console.log("搜索商品");
    },
    async getAllGoods() {
      const data = await AllGoods(this.params);
      console.log(data);
      this.tableData = data.data.goods;
    },
    handleSizeChange(num) {
      console.log(num);
    },
    handleCurrentChange(num) {
      console.log(num);
    },
  },
};
</script>

<style scoped>
.el-table {
  font-size: 12px;
}
</style>
