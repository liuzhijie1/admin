<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="~assets/img/heima.png" alt="logo" />
          电商后台管理系统
        </div>
        <div class="logout">
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isOpen?'64px':'200px'">
          <div class="toggle" @click="tackleOpen">| | |</div>
          <el-menu
            :default-active="ActiveRouter"
            class="el-menu-vertical-demo"
            :collapse="isOpen"
            background-color="#545c64"
            text-color="#fff"
            :collapse-transition="false"
            unique-opened
            active-text-color="#ffd04b"
            router
          >
            <el-submenu :index="item.id+''" v-for="(item,i) in navMenuList" :key="i">
              <template slot="title">
                <i :class="'iconfont icon-'+icons[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="item1.path+''" v-for="(item1,j) in item.children" :key="j">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  {{ item1.authName }}
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import storage from "good-storage";
import {reqMenus} from 'network/api'

export default {
  name: "Home",
  data() {
    return {
      isOpen: false,
      navMenuList:[],
      icons:{
        '125':'user',
        '103':'tijikongjian',
        '101':'shangpin',
        '102':'danju',
        '145':'baobiao'
      },
      activeList:[]
    }
  },
  created () {
    this.getMenu();
  },
  methods: {
    logout() {
      // storage.session.clear();
      // this.$router.push("/login");
      this.$confirm('是否退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          storage.session.clear();
          this.$router.push("/login");
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    tackleOpen(){
      this.isOpen = !this.isOpen;
    },
    async getMenu(){
      let data = await reqMenus();
      // console.log(data);
      this.navMenuList = data.data;
      data.data.forEach((item,index)=>{
        item.children.forEach((item1,index1)=>{
          this.activeList.push('/'+item1.path);
        })
      })
    }
  },
  computed: {
    ActiveRouter() {
      let active = this.activeList.find((item)=>{
        return this.$route.fullPath.indexOf(item) >= 0;
      })
      if(active == undefined) return;
      return active.slice(1);
    }
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  background: #333744;
}
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background: #373d41;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      color: whitesmoke;
      font-size: 20px;
      img {
        margin-right: 20px;
      }
    }
    .el-button {
      margin-right: 20px;
    }
  }
  .el-main {
    background: #eaedf1;
  }
}
.toggle{
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  color: whitesmoke;
  cursor: pointer;
}
.el-menu{
  border: 0px;
}
.iconfont{
  margin-right: 10px;
}
</style>
