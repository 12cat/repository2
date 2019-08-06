<template>
  <div id="common"
    v-loading="$store.state.loading"
    element-loading-text="正在加载..."
    element-loading-spinner="el-icon-loading"
    element-loading-color="#fff"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <layout v-show="$store.state.unauth">
      <transition name="el-fade-in-linear">
        <router-view />
      </transition>
    </layout>
  </div>
</template>

<script>
import '@/assets/styles/main.css'
import layout from '@/components/layout'

export default {
  name: 'common',
  components: {
    layout
  }
}
</script>

<style scoped>

</style>
