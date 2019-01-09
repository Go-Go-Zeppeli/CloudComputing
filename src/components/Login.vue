<template>
  <div id="login">
    <div id="window">
      <LoginWindow></LoginWindow>
    </div>
  </div>
</template>

<script>
import LoginWindow from '@/components/LoginWindow.vue'
export default {
  name: 'Login',
  components: {
    LoginWindow
  }
}
</script>

<style scoped>
  #login{
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/static/image/login_1.jpg");
  }
  #window{
    width: 90%;
    max-width: 700px;
  }
</style>
