<template>
  <div class="login">
    <div class="container">
      <div class="avatar">
        <img src="@/assets/avatar.jpg" alt="" />
      </div>
      <div>
        <el-input
          v-model="user.username"
          placeholder="请输入手机号码"
          prefix-icon="el-icon-user-solid"
        >
        </el-input>
        <el-input
          v-model="user.password"
          show-password
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
        >
        </el-input>
        <el-button @click="onLogin" class="login-btn" type="primary"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/apis/user.js'
export default {
  data() {
    return {
      user: {
        username: '13800138003', // 用户名/手机号
        password: '123' // 密码
      }
    }
  },
  methods: {
    // 登录点击事件
    async onLogin() {
      const res = await login(this.user)
      // // 校验手机号或密码合法性
      // const regName = /^1[3-9]\d{9}$/
      // const regPwd = /^.{3,10}$/
      // if (
      //   !regName.test(this.user.username) ||
      //   !regPwd.test(this.user.password)
      // ) {
      //   return this.$message.warning('输入内容不合法')
      // }
      // 判断是否登录成功
      if (res.data.message === '登录成功') {
        localStorage.setItem('hm-token-backend', res.data.data.token) // 存储token
        localStorage.setItem('hm-userID-backend', res.data.data.user.id) // 存储用户 id
        this.$message.success(res.data.message) // 成功提示
        this.$router.push('/index') // 跳转到首页
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .el-input {
      margin-bottom: 20px;
    }
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
