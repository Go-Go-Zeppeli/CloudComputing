<template>
  <div id="index">
    <!--<div id="title">-->
      <!--<div>-->
        <!--图片分析平台-->
      <!--</div>-->
    <!--</div>-->
    <div id="main-content">
      <div id="main-title">
        图片分析平台
      </div>
      <div id="main-buttons">
        <div class="button-block" style="background-image: url('/static/image/timg.jpg')">
          <button @click="go('Upload')" >图片上传分析</button>
        </div>
        <div class="button-block" style="background-image: url('/static/image/a.jpg')">
          <button @click="go('Trainning')">模型训练</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    go: function (sname) {
      this.$router.push({name: sname})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #index{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8EBED;
    background-image: url('/static/image/back.png');
  }
  #main-content{
    width: 1200px;
    max-width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
  }
  #main-title{
    margin-bottom: 60px;
    color: white;
    font-size: 36px;
    font-family: STKaiti;
  }
  #main-buttons{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-image: url('/static/image/back5.png');
    background-size: 100% 100%;
    padding: 24px;
    background-color: rgba(11,46,86,0.5);
  }
  .button-block{
    position: relative;
    width: 45%;
    padding-bottom: 45%;
    background-size: 100% 100%;
    background-position: center center;
    transition: all .3s;
  }
  .button-block button{
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 #000;
    background-color: rgba(0,0,0,0);
    color: #fff;
    transition: all .3s;
  }
  .button-block:hover button{
    background-color: rgba(255,255,255,0.3);
    color: #000;
  }
</style>
