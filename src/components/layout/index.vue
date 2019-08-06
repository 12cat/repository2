<template>
  <div class="layout" v-loading="$store.state.loading">
      <top></top>
      <div class="content">
        <div class="cont-menu">
          <el-menu :default-active="active">
            <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.desc">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span v-text="item.desc"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(e, i) in item.list" :key="i" :index="e.path">
                  <router-link :to="e.path" v-text="e.desc"></router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="cont-view">
          <el-main>
              <slot></slot>
          </el-main>
        </div>
      </div>
  </div>
</template>

<script>
import top from './top'

export default {
  name: 'layout',
  data () {
    return {
      active: '',
      menuList: [
        {
          desc: '账号管理',
          list: [
            {
              desc: '账号查询',
              path: '/system/account'
            }, {
              desc: '部门管理',
              path: '/system/department'
            }
          ]
        }, {
          desc: '页面管理',
          list: [
            {
              desc: '页面内容管理',
              path: '/page'
            }, {
              desc: '共献图谱管理',
              path: '/page/map'
            }, {
              desc: '幻灯管理',
              path: '/page/slide'
            }
          ]
        }, {
          desc: '文档管理',
          list: [
            {
              desc: '文档管理',
              path: '/file'
            }, {
              desc: '文档类目管理',
              path: '/file/category'
            }
          ]
        }
      ]
    }
  },
  components: { top },
  mounted () {
    // 接口调用，获取系统菜单列表
    // this.getAuthorityList()
    this.$store.state.unauth = true
  },
  methods: {
    getAuthorityList () {
      this.$service.kms.getAuthorityList().then(res => {
        if (res.data) {
          // if (res.data.length > 0) {
          //   this.active = this.$router.history.current.fullPath
          // }
        }
      })
    }
  }
}
</script>

<style scoped>
  .layout {
    height: 100%;
  }
  .content .cont-menu {
    position: fixed;
    top: 45px;
    left: -20px;
    width: 185px;
    height: 100%;
    padding: 0 10px;
    box-shadow: 1px 0 5px #eee;
    background-color: #fff;
    z-index: 1999;
  }
  .content .el-menu {
    margin-top: 20px;
    border: 0;
  }
  .content .crumbs {
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: 53px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 53px;
    padding-left: 215px;
    background-color: #fff;
    z-index: 1998;
    box-shadow: 2px 0 5px #eee;
  }
  .content .crumbs .gray {
    color: #bbb;
  }
  .content .cont-view {
    width: 100%;
    height: 100%;
    min-width: 1200px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 45px 0 0 185px;
    background-color: #f4f4f4;
  }
  .el-submenu .el-menu-item a {
    display: inline-block;
    width: 100px;
    height: 30px;
    color: #303133;
  }
  .el-submenu .el-menu-item.is-active a {
    color: #4c91d0;
  }
</style>
