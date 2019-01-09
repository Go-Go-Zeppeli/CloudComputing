<template>
  <div style="height: 100%">
    <div id="top">
      <div id="top-left">
        <img src="../../static/image/logo4.png" id="logo">
        <h2 id="title" v-show="title">实验室申报平台</h2>
      </div>
      <div id="top-right">
        <el-button style="margin-left: 24px" type="text" @click="small"><Icon type="md-menu" style="color:white"/></el-button>
        <el-dropdown trigger="click" style="margin-right: 24px" @command="setting">
          <span class="el-dropdown-link" style="color: white;cursor: pointer">
            {{realname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人信息</el-dropdown-item>
            <el-dropdown-item command="2">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="main">
      <div id="left">
        <el-menu default-active="EventList" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <!--<el-menu-item index="/index" v-if="menu[6]">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">我的桌面</span>-->
          <!--</el-menu-item>-->
          <el-submenu index="1" v-if="menu[1]">
            <template slot="title">
              <Icon type="ios-build" />
              <span slot="title">&nbsp;&nbsp;系统设置</span>
            </template>
            <el-menu-item v-if="menu[2]" index="/FunctionManage"><Icon type="logo-buffer" /> 功能管理</el-menu-item>
            <el-menu-item v-if="menu[3]" index="/RoleManage"><Icon type="ios-man" /> 角色管理</el-menu-item>
            <el-menu-item v-if="menu[4]" index="/UserManage"><Icon type="ios-contacts" /> 用户管理</el-menu-item>
            <el-menu-item v-if="menu[5]" index="LabManage"><Icon type="ios-flask" /> 字典管理</el-menu-item>
            <!--<el-menu-item index="LogManage"><Icon type="ios-clipboard" /> 日志管理</el-menu-item>-->
          </el-submenu>
          <el-submenu index="2" v-if="menu[7]">
            <template slot="title">
              <Icon type="ios-paper-plane" />
              <span slot="title">&nbsp;&nbsp;事件申报</span>
            </template>
            <!--<el-menu-item index="SubmitEvent"><Icon type="ios-share-alt" /> 发起申报</el-menu-item>-->
            <el-menu-item v-if="menu[9]" index="EventManage"><Icon type="ios-paper" /> 事件管理</el-menu-item>
            <el-menu-item v-if="menu[12]" index="ReportManage"><Icon type="md-mail" /> 申报管理</el-menu-item>
            <el-menu-item v-if="menu[11]" index="EventList"><Icon type="md-menu" /> 事件列表</el-menu-item>
            <el-menu-item v-if="menu[10]" index="CreateReport"><Icon type="ios-browsers-outline" /> 创建报表</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-if="menu[8]">
            <template slot="title">
              <Icon type="md-person" />
              <span slot="title">&nbsp;&nbsp;个人中心</span>
            </template>
            <el-menu-item v-if="menu[13]" index="Myprofile"><Icon type="ios-home" /> 我的信息</el-menu-item>
            <el-menu-item v-if="menu[14]" index="MyReview"><Icon type="logo-foursquare" /> 我的审批</el-menu-item>
            <el-menu-item v-if="menu[15]" index="MyRequests"><Icon type="ios-plane" /> 我的申报</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div id="main-block">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top'
import Left from '@/components/Left'
import * as dao from '../components/store/dao'
export default {
  name: 'Main',
  components: {
    Top,
    Left
  },
  data () {
    return {
      access: '',
      isCollapse: false,
      title: true,
      username: '',
      userId: '',
      realname: '',
      menu: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      test: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  methods: {
    small: function () {
      var a = document.getElementById('top-left')
      var b = document.getElementById('top-right')
      var c = document.getElementById('main-block')
      var d = document.getElementById('left')
      var that = this
      if (!this.isCollapse) {
        a.style.width = '64px'
        d.style.width = '64px'
        b.style.width = 'calc(100% - 64px)'
        c.style.width = 'calc(100% - 64px)'
      } else {
        a.style.width = '200px'
        d.style.width = '200px'
        b.style.width = 'calc(100% - 200px)'
        c.style.width = 'calc(100% - 200px)'
      }
      this.isCollapse = !this.isCollapse
      setTimeout(function () {
        that.title = !that.title
      }, 300)
    },
    setting: function (a) {
      if (a === '1') {
        this.$router.push('/MyProfile')
      } else {
        dao.delCookie('ACCESS_TOKEN')
        this.$router.push('/Login')
      }
    }
  },
  created: function () {
    this.access = dao.getCookie('ACCESS_TOKEN')
    this.userId = dao.getCookie('ACCESS_USERID')
    this.$http.get('http://39.106.109.8:5005/api/users/' + this.userId + '?accessToken=' + this.access).then(res => {
      console.log(res)
      if (res.body.succeed) {
        this.realname = res.body.value.name
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/users/' + this.userId + '/menu?accessToken=' + this.access).then(res => {
      res.body.value.forEach(row => {
        this.test[row.value] = 1
        if (row.children.length > 0) {
          row.children.forEach(row => {
            this.test[row.value] = 1
          })
        }
        console.log(this.menu)
        this.menu = this.test
      })
      console.log(res)
    })
  }
}
// this.$http.get('/api/labs?accessToken=' + this.$parent.access).then(res => {
//   console.log(res)
//   if (res.body.succees) {
//     this.$message({
//       message: '创建成功',
//       type: 'success',
//       showClose: true
//     })
//   } else {
//     this.$message({
//       message: res.body.message,
//       type: 'danger',
//       showClose: true
//     })
//   }
// })
</script>

<style scoped>
  #left{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    width: 200px;
    transition: all 0.3s ease-in-out;
  }
  #left::-webkit-scrollbar {/*滚动条整体样式*/
    width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
  }
  #left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 1px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  #left::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 1px;
    background: #EDEDED;
  }
  #main-block{
    width: calc(100% - 200px);
    height: 100%;
    transition: all 0.3s ease-in-out;
    overflow-y: auto;
  }
  #main{
    display: flex;
    height: calc(100% - 63px);
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
  .el-menu{
    height: 100%;
  }
  #top{
    height: 63px;
    display: flex;
  }
  #top-left{
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    position: relative;
  }
  #top-right{
    display: flex;
    align-items: center;
    background: linear-gradient(to right, rgb(63,118,231) 0%,rgb(24,189,242) 100%);
    transition: all 0.4s;
    width: calc(100% - 200px);
    justify-content: space-between;
  }
  .ivu-icon{
    font-size: 20px;
  }
  #logo{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 16px;
    top: 16px;
  }
  #title{
    /*margin-left: 24px;*/
    white-space:nowrap;
    text-overflow:ellipsis;
    position: absolute;
    left: 54px;
  }
</style>
