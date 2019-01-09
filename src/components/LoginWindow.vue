<template>
  <div id="login-window">
    <div class="input-group">
      <p class="label">用户名</p>
      <!--<Input v-model="username" prefix="ios-contact" placeholder="请输入用户名" />-->
      <el-input placeholder="请输入用户名" v-model="username" >
        <Icon slot="prefix" type="ios-contact" />
      </el-input>
    </div>
    <div class="input-group">
      <p class="label">密码</p>
      <!--<Input v-model="password" prefix="md-lock" placeholder="请输入密码" />-->
      <el-input type="password" placeholder="请输入密码" v-model="password" >
        <Icon slot="prefix" type="md-lock" />
      </el-input>
    </div>
    <div class="input-group">
      <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
    </div>
    <div class="input-group">
      <el-checkbox v-model="remember">记住我</el-checkbox>
    </div>
    <div class="input-group" id="flex-right">
      <a class="right-a" @click="forget">忘记密码</a>
      <a class="right-a" @click="register">注册</a>
    </div>
  </div>
</template>

<script>
// import * as dao from '../components/store/dao'
export default {
  name: 'LoginWindow',
  data () {
    return {
      username: '',
      password: '',
      remember: false
    }
  },
  http: {
    root: '/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  methods: {
    register: function () {
      this.$router.push({name: 'Register'})
    },
    forget: function () {
      this.$message({
        message: '请联系管理员',
        type: 'warning',
        showClose: true
      })
    },
    submit: function () {
      if (this.username === '') {
        this.$message({
          message: '用户名不可为空',
          type: 'error',
          showClose: true
        })
        return 0
      }
      if (this.password === '') {
        this.$message({
          message: '密码不可为空',
          type: 'error',
          showClose: true
        })
        return 0
      }
      this.$router.push({name: 'Upload'})
      // this.$http.post('http://39.106.109.8:5005/api/auth', {userId: this.username, password: this.password}).then(response => {
      //   console.log(response)
      //   if (response.body.succeed) {
      //     dao.setCookie('ACCESS_TOKEN', response.body.value.accessToken)
      //     dao.setCookie('ACCESS_USERID', response.body.value.userId)
      //     this.$router.push({path: 'EventList'})
      //   } else {
      //     this.$message({
      //       message: '用户名或密码错误',
      //       type: 'error',
      //       showClose: true
      //     })
      //   }
      // }, response => {
      //   this.$message({
      //     message: '连接失败，请检查网络连接',
      //     type: 'error',
      //     showClose: true
      //   })
      // })
    }
  }
}
</script>

<style scoped>
  #login-window{
    padding: 40px 40px 20px;
    /*padding: 40px;*/
    border-radius: 5px;
    background: white;
  }
  .label
  {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .input-group{
    margin-bottom: 16px;
  }
  .ivu-icon{
    color: #000;
    line-height: 40px;
    font-size: 14px;
    margin-left: 4px;
  }
  #flex-right{
    display: flex;
    justify-content: flex-end;
  }
  .right-a{
    margin-right: 14px;
  }
</style>
