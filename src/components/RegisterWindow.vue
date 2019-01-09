<template>
  <div>
    <div id="title">
      <h1>Register</h1>
    </div>
    <div id="register-window">
      <div class="input-group">
        <el-input placeholder="请输入用户名" v-model="username" >
          <Icon slot="prefix" type="ios-contact" />
        </el-input>
      </div>
      <div class="input-group">
        <el-input type="password" placeholder="请输入密码" v-model="password" >
          <Icon slot="prefix" type="md-lock" />
        </el-input>
      </div>
      <div class="input-group">
        <el-input type="password" placeholder="请确认密码" v-model="confirm_password" >
          <Icon slot="prefix" type="md-lock" />
        </el-input>
      </div>
      <div class="input-group">
        <el-input placeholder="请输入真实姓名" v-model="realname" >
          <Icon slot="prefix" type="ios-contact" />
        </el-input>
      </div>
      <div class="input-group">
        <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
      </div>
      <div class="input-group" id="flex-right">
        <a class="right-a" @click="login">现在登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterWindow',
  data () {
    return {
      username: '',
      password: '',
      confirm_password: '',
      realname: ''
    }
  },
  http: {
    root: '/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  methods: {
    login: function () {
      this.$router.push({name: 'Login'})
    },
    register: function () {
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
      if (this.confirm_password !== this.password) {
        this.$message({
          message: '两次密码输入不同',
          type: 'error',
          showClose: true
        })
        return 0
      }
      if (this.realname === '') {
        this.$message({
          message: '真实姓名不可为空',
          type: 'error',
          showClose: true
        })
        return 0
      }
      var message = {
        userId: this.username,
        password: this.password,
        name: this.realname
      }
      console.log(message)
      this.$http.post('http://39.106.109.8:5005/api/users', message).then(response => {
        console.log(response)
        if (response.body.succeed) {
          this.$message({
            message: '注册成功',
            type: 'success',
            showClose: true
          })
          this.$router.push({path: '/login'})
        } else {
          this.$message({
            message: response.body.message,
            type: 'error',
            showClose: true
          })
        }
      }, response => {
        this.$message({
          message: '连接失败，请检查网络',
          type: 'error',
          showClose: true
        })
      })
    }
  }
}
</script>

<style scoped>
  #register-window{
    padding: 40px 40px 20px;
    /*padding: 40px;*/
    border-radius: 5px;
    background: white;
    box-shadow: 0 -25px 37.7px 11.3px rgba(8, 143, 220, 0.07);
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
  #title{
    display: flex;
    justify-content: center;
  }
  #title h1{
    margin-bottom: 24px;
    font-size: 2rem;
  }
</style>
