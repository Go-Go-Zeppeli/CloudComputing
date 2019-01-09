<template>
  <div id="upload">
    <div id="title">
      <div id="back">
        <el-button @click="back" type="text"><Icon style="font-size: 24px" type="md-arrow-back" /></el-button>
      </div>
      <div>
        图片上传分析
      </div>
    </div>
    <div id="upload-content">
      <el-steps :active="active" finish-status="success" align-center style="width: 100%;margin: 12px 0;">
        <el-step title="上传图片"></el-step>
        <el-step title="确认图片"></el-step>
        <el-step title="分析结果"></el-step>
      </el-steps>
      <div id="main-content">
        <div id="upload-pic" v-show="upload">
          <el-upload
            class="upload-demo"
            drag
            action="http://101.200.32.126:5000/input"
            ref="uploads"
            :on-success="success"
            :on-error="error"
            :on-change="change"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </div>
        <div id="thispic" v-show="this_pic">
          <div id="pic">
            <img :src="thispicurl" style="max-width: 100%;max-height: 100%">
          </div>
          <div class="buttons">
            <el-button @click="pre">上一步</el-button>
            <el-button @click="next">下一步</el-button>
          </div>
        </div>
        <div style="height: 100%" v-show="over_pic" v-loading="loading" element-loading-text="分析中，请稍后">
          <div id="finpic">
            <img :src="overpicurl" style="max-width: 100%;max-height: 100%">
          </div>
          <div class="buttons" v-show="!loading">
            <el-button @click="rturn">返回上传</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<el-button @click="success">页面二</el-button>-->
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      active: 0,
      upload: true,
      this_pic: false,
      over_pic: false,
      thispicurl: '',
      overpicurl: '',
      loading: false,
      picname: ''
    }
  },
  methods: {
    success: function (response) {
      console.log(response)
      this.active++
      this.upload = false
      this.this_pic = true
      this.thispicurl = 'http://101.200.32.126:5000/' + response.Path
    },
    error: function (response) {
      console.log(response)
    },
    change: function () {
      // this.active++
      // this.upload = false
      // this.this_pic = true
    },
    pre: function () {
      this.active--
      this.upload = true
      this.this_pic = false
      this.$refs.uploads.clearFiles()
    },
    next: function () {
      this.active++
      this.this_pic = false
      this.over_pic = true
      this.loading = true
      var sname = this.thispicurl.substring(this.thispicurl.indexOf('IN_PATH') + 8)
      console.log(sname)
      var data = JSON.stringify({'name': sname})
      this.$http.post('http://101.200.32.126:5000/up_load', data).then(res => {
        console.log(res)
        this.overpicurl = 'http://101.200.32.126:5000/' + res.data.Path
        this.picname = res.data.Path
        this.loading = false
        this.active++
      })
    },
    add: function () {
      this.active++
    },
    rturn: function () {
      this.active = 0
      this.this_pic = false
      this.over_pic = false
      this.thispicurl = ''
      this.overpicurl = ''
      this.upload = true
      this.$refs.uploads.clearFiles()
    },
    downs: function () {
      // var alink = document.createElement('a')
      // alink.href = this.overpicurl
      // alink.download = 'xxx.jpg'
      // alink.click()
    },
    back: function () {
      this.$router.push({name: 'Index'})
    }
  }
}
</script>

<style scoped>
  #title{
    width: 100%;
    height: 60px;
    position: absolute;
    background-color: #F0F2F3;
    color: black;
    top: 0;
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-left: 36px;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 10px 12px 0 rgba(170,182,206,.2), inset 0 -1px 0 0 rgba(255,255,255,.3);
  }
  #upload{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8EBED;
  }
  #upload-content{
    width: 1000px;
    max-width: 90%;
    height: 600px;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #main-content{
    background-color: #fff;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.06), 0 10px 12px 0 rgba(170,182,206,.15);
    width: 100%;
    height: calc(100% - 81px);
    padding: 24px;
  }
  #upload-pic{
    width: 100%;
    height: 100%;
  }
  .upload-demo{
    width: 100%;
    height: 100%;
  }
  #thispic{
    /*padding: 12px 24px 12px;*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .buttons{
    display: flex;
    justify-content: flex-end;
    padding-top: 12px;
  }
  #pic{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #finpic{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #back{
    height: 30px;
    border-right: 1px solid #eee;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
</style>
