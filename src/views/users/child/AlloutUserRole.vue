<template>
  <div class="allotUserRole">
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">当前角色 :</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            {{ userinfo.username }}
          </div></el-col
        >
      </el-row>
      <br />
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">当前角色 :</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            {{ userinfo.role_name }}
          </div></el-col
        >
      </el-row>
      <br />
      <el-row :gutter="20" align="middle">
        <el-col :span="6"
          ><div  class="newRole">分配新角色 :</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in Roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select></div
        ></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {allRoles,allotRole} from 'network/api';
import {isOk} from 'utils/common.js';
export default {
  props: {
    userinfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      value:"",
      Roles:[],
    };
  },
  created () {
    this.getRoles();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.value = '';
          done();
        })
        .catch((_) => {});
    },
    async getRoles(){
      const data = await allRoles();
      this.Roles = data.data;
    },
    async changeRole(){
      // console.log(this.userinfo.id,this.value);
      if(this.value == '') return this.dialogVisible = false;
      const data = await allotRole(this.userinfo.id,this.value);
      // console.log(data);
      this.dialogVisible = false;
      this.$emit('hasAdd');
      isOk(this,data.meta);
    }
  },
};
</script>

<style scoped>
.newRole{
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
