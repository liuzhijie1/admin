<template>
  <div class="params">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-form ref="form" label-width="120px">
        <el-form-item label="选择商品分类 : ">
          <el-cascader
            v-model="cascaderValue"
            :options="cascaderDate"
            :props="cascaderProp"
            @change="handleChange"
            clearable 
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <ParamsTable :activeName="activeName" :ID='ID' :flag="who"></ParamsTable>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <ParamsTable :activeName="activeName" :ID="ID" :flag="!who"></ParamsTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb";
import { AllCategories } from "network/api";
import ParamsTable from './child/ParamsTable'
export default {
  components: {
    Breadcrumb,
    ParamsTable
  },
  data() {
    return {
      list: ["首页", "商品管理", "参数列表"],
      cascaderDate: [],
      cascaderValue: [],
      cascaderProp: {
        label: "cat_name",
        value: "cat_id",
      },
      activeName:'many',
      ID:-1,
      who:false,
    };
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      const result = await AllCategories();
      this.cascaderDate = result.data;
      console.log(result);
    },
    handleChange(value) {
      if (value.length !== 3){
        this.cascaderValue = [];
        this.ID = -1;
        return ;
      } 
      this.ID = value[2];
    },
    handleClick(tab, event){
      // console.log(tab,event);
      this.who = !this.who;
    }
  },
  
};
</script>

<style scoped>
.el-form {
  margin-top: 16px;
  margin-bottom: 16px;
}
.el-cascader {
  width: 300px;
}
</style>
