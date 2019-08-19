<template>
  <div id="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查看日志</span>
      </div>
      <div class="form">
        <p>
          <label class="w100">筛选</label>
          <el-input class="w180" v-model="query"></el-input>
          <label class="w100">日期</label>
          <el-date-picker v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </p>
        <p>
          <label class="w100">状态</label>
          <el-select class="w180" v-model="operationType">
            <el-option label="查看所有记录" value=""></el-option>
            <el-option label="仅查看访问记录" :value="1"></el-option>
            <el-option label="仅查看下载记录" :value="2"></el-option>
            <el-option label="仅查看收藏记录" :value="3"></el-option>
            <el-option label="仅查看推荐记录" :value="4"></el-option>
            <el-option label="仅查看上传记录" :value="5"></el-option>
            <el-option label="仅查看登录记录" :value="6"></el-option>
          </el-select>
          <label class="w100">&nbsp;</label>
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearParam">重置</el-button>
          <el-button type="primary" @click="exported">导出Excel</el-button>
        </p>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="categoryName" label="操作"></el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | ymdt }}</span>
          </template>
        </el-table-column>
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
  name: 'log',
  data () {
    return {
      query: '',
      operationType: '',
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
      this.query = ''
      this.operationType = ''
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
      this.$service.kms.getRecords({
        query: this.query,
        operationType: this.operationType,
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
