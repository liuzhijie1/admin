<template>
  <div class="orders">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <div style="margin-top: 15px;" class="searchContent">
        <el-input
          placeholder="请输入内容"
          v-model="params.query"
          class="input-with-select"
          @clear="clearSearch"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="SearchOrder"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="200">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="prop">
            <el-tag type="danger" v-if="prop.row.pay_status == 0" size="mini">未付款</el-tag>
            <el-tag type="success" v-else size="mini">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="prop">
            {{ prop.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="prop">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInfo"></el-button>
          <el-button
            type="success"
            icon="el-icon-location"
            size="mini"
            @click="checkOrderInfo(prop.row.order_id)"
          ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <OrderInfo ref="showOrderInfo" :activities="OrderInfo"></OrderInfo>
    <EditInfo ref="showEditInfo"></EditInfo>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { AllOrders,CheckOrderInfo } from "network/api";
import {isOk} from 'utils/common'
import OrderInfo from './child/OrderInfo';
import EditInfo from './child/EditInfo'
export default {
  components: {
    Breadcrumb,
    OrderInfo,
    EditInfo
  },
  data() {
    return {
      list: ["首页", "订单管理", "订单列表"],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "",
      },
      tableData: [],
      total:0,
      OrderInfo:[]
    };
  },
  created() {
    this.getAllOrders();
  },
  methods: {
    async getAllOrders() {
      const data = await AllOrders(this.params);
      console.log(data);
      isOk(this,data.meta);
      this.tableData = data.data.goods;
      this.total = data.data.total;
    },
    handleSizeChange(num){
      this.params.pagesize = num;
      this.getAllOrders();
    },
    handleCurrentChange(num){
      // console.log(num);
      this.params.pagenum = num;
      this.getAllOrders();
    },
    SearchOrder(){
      console.log('搜索订单');
      if(this.params.query == '') return;
      this.getAllOrders();
    },
    clearSearch(){
      this.params.pagenum = 1;
      this.params.pagesize = 10;
      this.getAllOrders();
    },
    async checkOrderInfo(id){
      console.log('搜索订单信息');
      id = 804909574412544580;   //设置模拟数据
      const result = await CheckOrderInfo(id);
      this.OrderInfo = result.data;
      this.$refs['showOrderInfo'].dialogVisible = true;
      console.log(result);
    },
    editInfo(){
      this.$refs['showEditInfo'].dialogVisible = true;
    }
  },
};
</script>

<style scoped>
.searchContent {
  width: 50%;
}
.el-table {
  font-size: 12px;
}
</style>
