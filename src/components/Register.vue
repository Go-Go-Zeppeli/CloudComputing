<template>
  <div id="register">
    <div id="window">
      <RegisterWindow></RegisterWindow>
    </div>
  </div>
</template>

<script>
import RegisterWindow from '@/components/RegisterWindow.vue'
export default {
  name: 'Register',
  components: {
    RegisterWindow
  }
}
</script>

<style scoped>
  #register{
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/static/image/register.jpg");
  }
  #window{
    width: 90%;
    max-width: 700px;
  }
</style>
