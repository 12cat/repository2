<template>
  <div id="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据统计</span>
      </div>
      <div class="form">
        <p>
          <label class="w100">日期</label>
          <el-date-picker v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <label class="w100">&nbsp;</label>
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearParam">重置</el-button>
          <el-button type="primary" @click="exported">导出Excel</el-button>
        </p>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="name" label="文件总数"></el-table-column>
        <el-table-column prop="name" label="累计下载数"></el-table-column>
        <el-table-column prop="name" label="在线用户数"></el-table-column>
        <el-table-column prop="name" label="日登录数"></el-table-column>
        <el-table-column prop="name" label="日浏览数"></el-table-column>
      </el-table>
      <el-pagination :current-page.sync="pageIndex"
        :page-size="20"
        :total="total"
        @current-change="getList"
        layout="total, prev, pager, next">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'total',
  data () {
    return {
      date: '',
      pageIndex: 1,
      total: 0,
      dataList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    clearParam () {
      this.date = ''
    },
    getList (index) {
      this.pageIndex = index || 1
      let startTime = ''
      let endTime = ''
      if (this.date && this.date.length > 0) {
        startTime = this.date[0]
        endTime = this.date[1]
      }
      this.$service.kms.searchDocument({
        startTime: startTime,
        endTime: endTime,
        pageIndex: this.pageIndex,
        pageSize: 20
      }).then(res => {
        if (res) {
          this.dataList = res.data.page.data
          this.total = res.data.page.total
        }
      })
    },
    exported () {
      window.open('http://www/baidu.com')
    }
  }
}
</script>

<style scoped>
label.w100 {
  display: inline-block;
  text-align: right;
}
.form p {
  margin-bottom: 10px;
}
.el-form {
  margin-top: 0;
}
</style>
