<template>
  <div class="add-goods">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <el-alert center title="消息提示的文案" type="info"> </el-alert>
      <el-steps :active="active" finish-status="success" width="60%">
        <el-step title="基本属性"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
        <el-tab-pane label="基本信息" name="first">

        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name="five">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      list: ["首页", "商品管理", "添加商品"],
      active: 0,
      activeName: "first",
      activeList: ["first", "second", "third", "fourth", "five"],
    };
  },
  methods: {
    // 使步骤条一步一步滚动
    next() {
      if (this.active++ > 5) this.active = 0;
    },
    handleClick(tab, event) {
      this.active = +tab.index;
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.el-alert {
  margin-bottom: 16px;
}
.el-tab {
  font-size: 12px !important;
}
.el-step{
    margin-bottom: 16px;
}
</style>
