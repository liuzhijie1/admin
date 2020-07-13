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
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        tabPosition="left"
        :before-leave="beforeChange"
      >
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
        <el-tab-pane label="商品参数" name="second">
          <template v-for="(item) in manyArray">
            <div class="title" :key="item.attr_name">{{ item.attr_name }}</div>
            <el-tag
              size="mini"
              v-for="(item11,index) in item.listValue"
              :key="item11"
              closable
              @close="deleteTag(item.listValue,index)"
              >{{ item11 }}</el-tag
            >
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <template v-for="item in staticArray">
            <div :key="item.attr_id" class="title">{{ item.attr_name }}</div>
            <el-input v-model="item.attr_vals" :key="item.attr_name"></el-input>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">
          <el-upload
            class="upload-demo"
            :action="'http://127.0.0.1:8888/api/private/v1/upload'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture"
            :headers="headerObj"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="five" class="five">
          <quill-editor v-model="OneGoods.goods_introduce"></quill-editor>
          <el-button type="primary" class="addBtn" @click="submitGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible="previewVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-image :src="previewPath"></el-image>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "components/Breadcrumb.vue";
import { AllCategories, getAllAttributes,AddGoods } from "network/api";
import storage from "good-storage";
import {isOk} from 'utils/common';
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
      // 商品添加信息
      OneGoods: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      // 表格规则
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
      // 级联选择器的参数
      props: {
        expandTrigger: "hover",
        checkStrictly: false,
        label: "cat_name",
        value: "cat_id",
      },
      // 级联选择器源数据
      options: [],
      // 级联选择器选中的值
      value: [],
      // 表单是否通过监测
      ok: "",
      // 动态参数
      manyArray: [],
      // 静态属性
      staticArray: [],
      headerObj: {
        Authorization: storage.session.get("token"),
      },
      // 图片预览
      previewVisible: false,
      previewPath: "",
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
      if (!this.ok) return;
      this.active = +tab.index;
      console.log(tab);

      // console.log(tab, event);
    },
    beforeChange(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);
      this.$refs["ruleForm"].validate((ok1) => {
        this.ok = ok1;
      });
      if (!this.ok) return false;
    },
    async getAllCategories() {
      const result = await AllCategories();
      this.options = result.data;
      console.log(result);
    },
    handleChange(chiose) {
      console.log("级联选择器", chiose);
    },
    // 处理图片预览
    handlePreview(file) {
      console.log(file);
      this.previewVisible = true;
      this.previewPath = file.response.data.url;
    },
    // 处理图片删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let tempath = file.response.data.tmp_path;
      let num;
      this.OneGoods.pics.forEach((item,index)=>{
        if(item.pic==tempath){
          num = index;
          return;
        }
      })
      this.OneGoods.pics.splice(num,1);
    },
    handleSuccess(file){
      console.log(file);
      let tempath = file.data.tmp_path;
      this.OneGoods.pics.push({'pic':tempath});
    },
    handleClose(){
      this.previewVisible = false
    },
    async submitGoods(){
      this.staticArray.forEach((item,index)=>{
        let obj = {
          attr_id:item.attr_id,
          attr_value:item.attr_vals,
        }
        this.OneGoods.attrs.push(obj);
      })
      this.manyArray.forEach((item,index)=>{
        let obj = {
          attr_id: item.attr_id,
          attr_value: item.listValue.join(' '),
        }
        this.OneGoods.attrs.push(obj);
      })
      console.log(this.OneGoods);
      const result = await AddGoods(this.OneGoods);
      isOk(this,result.meta);
      this.$router.push('/goods');
    },
    deleteTag(obj,index){
      console.log(obj,index);
      obj.splice(index,1);
    }
  },
  watch: {
    value(newValue) {
      this.OneGoods.goods_cat = newValue.join(",");
    },
    async activeName(newValue) {
      if (newValue == "second") {
        let result = await getAllAttributes(this.value[this.value.length - 1], {
          sel: "many",
        });
        result.data.forEach((item, index) => {
          if (item.attr_vals == "") {
            item.listValue = [];
          } else {
            item.listValue = item.attr_vals.split(" ");
          }
        });
        this.manyArray = result.data;
        console.log(result);
      } else if (newValue == "third") {
        let result = await getAllAttributes(this.value[this.value.length - 1], {
          sel: "only",
        });
        console.log(result);
        this.staticArray = result.data;
      } else {
        return;
      }
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
.el-cascader {
  width: 100%;
}
/* .quill-editor{
  height: 170px;
} */
.five {
  min-height: 300px;
  /* position: relative; */
}
.addBtn {
  margin-top: 15px;
}
.title {
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.el-tag {
  margin: 5px 10px 5px 0px;
}
</style>
