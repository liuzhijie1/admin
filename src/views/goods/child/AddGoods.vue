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
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left" :before-leave="beforeChange">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="first">
          <el-form
            :model="OneGoods"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="OneGoods.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="OneGoods.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                v-model="OneGoods.goods_weight"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="OneGoods.goods_number"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="value"
                :options="options"
                :props="props"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name="five" class="five">
          <quill-editor
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  ></quill-editor>
  <el-button type="primary" class="addBtn">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { AllCategories } from "network/api";
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
      OneGoods: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: "",
        attrs: "",
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
      },
      props: {
        expandTrigger: "hover",
        checkStrictly: false,
        label: "cat_name",
        value: "cat_id",
      },
      options: [],
      value:[],
      ok:'',
      content: '',
      editorOption: {
          // Some Quill options...
        }
    };
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    // 使步骤条一步一步滚动
    next() {
      if (this.active++ > 5) this.active = 0;
    },
    handleClick(tab, event) {
      if(!this.ok) return ;
      this.active = +tab.index;
      console.log(tab);
      
      // console.log(tab, event);
    },
    beforeChange(activeName,oldActiveName){
      console.log(activeName,oldActiveName)
      this.$refs['ruleForm'].validate((ok1)=>{
        this.ok = ok1;
      })
      if(!this.ok) return false;
    },
    async getAllCategories() {
      const result = await AllCategories();
      this.options = result.data;
      console.log(result);
    },
    handleChange(chiose){
      console.log('级联选择器',chiose);
    }
  },
  watch: {
    value(newValue) {
      this.OneGoods.goods_cat = newValue.join(',');
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
.el-step {
  margin-bottom: 16px;
}
.el-cascader{
  width: 100%;
}
/* .quill-editor{
  height: 170px;
} */
.five{
  min-height: 300px;
  /* position: relative; */
}
.addBtn{
  margin-top: 15px;
}
</style>
