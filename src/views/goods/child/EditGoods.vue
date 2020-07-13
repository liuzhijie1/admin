<template>
  <div class="edit-goods">
    <el-dialog
      title="编辑商品"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
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
          <el-input v-model="OneGoods.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="OneGoods.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="OneGoods.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {EditGoods} from 'network/api';
import {isOk} from 'utils/common'
export default {
  props: {
      EditOneGoods: {
          type: Object,
          default: ()=>{
              return {}
          }
      },
  },  
  data() {
    return {
      dialogVisible: false,
      OneGoods: {
        goods_name: "",
        goods_cat: "172,173,183",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 这里应该设置选择分类，和添加商品一样重新修改。
    async Submit(){
        const result = await EditGoods(this.EditOneGoods.goods_id,this.OneGoods);
        console.log(result);
        isOk(this,result.meta);
        this.dialogVisible = false;
    }
  },
  watch: {
      EditOneGoods(newValue) {
          for(let key in newValue){
              this.OneGoods[key] = newValue[key];
          }
      }
  },
};
</script>

<style></style>
