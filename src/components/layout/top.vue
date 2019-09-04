<template>
  <div class="top">
    <ul class="left">
      <li><a class="logo"></a></li>
      <li><span class="title" v-text="title"></span></li>
    </ul>
    <ul class="right">
      <li><span class="userName" v-text="$store.state.user_name"></span></li>
      <li><button @click="logout">退出</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      title: 'KMS后台管理系统'
    }
  },
  methods: {
    logout () {
      this.$service.kms.logout().then(res => {
        this.$router.push('/login')
        this.$store.state.user_name = undefined
      }).catch(_ => {})
    }
  }
}
</script>

<style scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
  background-color: #4c91d0;
  z-index: 1999;
}
.top li {
  float: left;
}
.top .logo {
  display: inline-block;
  width: 153px;
  height: 33px;
  background: url('../../assets/image/logo.png') no-repeat center;
  background-size: 100% 100%;
  margin-top: 6px;
  margin-left: 15px;
}
.top .title {
  display: inline-block;
  margin-left: 8px;
  padding-left: 8px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  border-left: 1px solid #f2f2f2;
}
.top button {
  display: inline-block;
  width: 78px;
  height: 28px;
  margin-right: 30px;
  border: 1px solid #f2f2f2;
  background-color: #4c91d0;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
}
.top .userName {
  margin-right: 30px;
  font-size: 14px;
  line-height: 45px;
}
.top img {
  margin-top: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
