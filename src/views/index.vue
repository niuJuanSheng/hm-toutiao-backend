<template>
  <div class="home">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div @click="$router.push('/index/home')" class="logo"></div>
        <span class="el-icon-s-fold toggle-btn"></span>
        <span class="system-title">黑马头条后台管理系统</span>
        <div class="welcome">
          <span>欢迎你：{{ user.nickname }}</span> &nbsp;&nbsp;
          <span style="cursor:pointer" @click="onLogout"> 退出</span>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <el-row>
            <el-col :span="12">
              <el-menu
                :router="true"
                unique-opened
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <!-- 用户管理区域 -->
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="1-1">
                    <i class="el-icon-user-solid"></i>
                    用户列表
                  </el-menu-item>
                  <el-menu-item index="1-2">
                    <i class="el-icon-circle-plus-outline"></i>
                    用户添加
                  </el-menu-item>
                </el-submenu>
                <!-- 文章管理区域 -->
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>文章管理</span>
                  </template>
                  <el-menu-item index="/index/articleList">
                    <i class="el-icon-reading"></i>
                    文章列表
                  </el-menu-item>
                  <el-menu-item index="/index/addArticle">
                    <i class="el-icon-circle-plus-outline"></i>
                    文章添加
                  </el-menu-item>
                </el-submenu>
                <!-- 栏目管理区域 -->
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>栏目管理</span>
                  </template>
                  <el-menu-item index="/column">
                    <i class="el-icon-s-promotion"></i>
                    栏目列表
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <!-- 二级路由挂载点 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { user } from '@/apis/user.js'
export default {
  data() {
    return {
      user: {} // 用户详情
    }
  },
  methods: {
    // 退出功能
    onLogout() {
      localStorage.removeItem('hm-token-backend')
      localStorage.removeItem('hm-userID-backend')
      this.$router.push('/login')
    }
  },
  created() {
    user(localStorage.getItem('hm-userID-backend')).then(res => {
      this.user = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    padding-left: 0;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
    width: 200px;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
.toggle-btn {
  position: absolute;
  left: 220px;
}
.el-col {
  width: 100%;
}
.el-menu {
  border: none;
}
</style>
