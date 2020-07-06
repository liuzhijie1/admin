<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{list[1]}}</el-breadcrumb-item>
      <el-breadcrumb-item >{{list[2]}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props:{
        list:{
            required:true,
            type:Array,
        }
    }
};
</script>

<style>
.el-breadcrumb{
    font-size: 12px;
    margin-bottom: 20px;
}
</style>
