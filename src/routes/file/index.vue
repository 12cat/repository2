<template>
  <div id="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文档管理</span>
      </div>
      <div class="form">
        <p>
          <label class="w100">文档标题</label>
          <el-input class="w180" v-model="title"></el-input>
          <label class="w100">类目名称</label>
          <el-cascader class="w180" v-model="categoryName"
            :options="categoryList"
            :props="categoryProps"
            change-on-select>
          </el-cascader>
          <label class="w100">状态</label>
           <el-select class="w180" v-model="recommend">
            <el-option label="全部" value=""></el-option>
            <el-option label="已推荐" :value="1"></el-option>
          </el-select>
        </p>
        <p>
          <label class="w100">开始时间</label>
          <el-date-picker class="w180" v-model="startTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          <label class="w100">结束时间</label>
          <el-date-picker class="w180" v-model="endTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          <label class="w100">&nbsp;</label>
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearParam">重置</el-button>
        </p>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="title" label="文件名称"></el-table-column>
        <el-table-column prop="categoryName" label="所在类目"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | ymdt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.recommend ? '已推荐' : '未推荐' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operatorName" label="上传人"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editFile(scope.row.id)">修改</el-button>
            <el-button type="text" @click="delFile(scope.row.id)">删除</el-button>
            <el-button type="text" @click="toRecommend(scope.row)">{{ scope.row.recommend ? '取消推荐' : '推荐' }}</el-button>
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

    <!-- 增加 ／ 编辑内容 -->
    <el-dialog title="修改" :visible.sync="dialog">
      <el-form label-width="100">
        <el-form-item label="文章标题">
          <el-input class="w180" v-model="param.title"></el-input>
        </el-form-item>
        <el-form-item label="类目选择">
          <el-cascader class="w180" v-model="param.categoryName"
            :options="categoryList"
            :props="categoryProps"
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-input class="w180" v-model="param.tags"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-input type="textarea" v-model="param.introduction"></el-input>
        </el-form-item>
        <el-form-item label="上传">
          <el-upload class="upload-demo mar-l100"
            :action="$store.state.uploadPath"
            :on-success="uploadFile">
            <span>{{ param.name }}</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="uplodaDocument">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'file',
  data () {
    return {
      title: '',
      categoryName: [],
      startTime: '',
      endTime: '',
      recommend: '',
      pageIndex: 1,
      total: 0,
      dataList: [],
      categoryList: [],
      categoryProps: {
        value: 'id',
        label: 'name',
        children: 'childs'
      },
      dialog: false,
      param: {
        canDownload: '',
        id: '',
        title: '',
        category: '',
        tags: '',
        introduction: '',
        public: '',
        name: '',
        path: '',
        size: '',
        type: ''
      },
      arr: [],
      flag: true
    }
  },
  mounted () {
    this.getcategoryList()
    this.getList()
  },
  methods: {
    clearParam () {
      this.title = ''
      this.categoryName = []
      this.startTime = ''
      this.endTime = ''
      this.recommend = ''
    },
    getcategoryList () {
      this.$service.kms.getCategoryList({
        category: 0,
        level: 100
      }).then(res => {
        if (res) {
          this.categoryList = res.data
        }
      }).catch(_ => {})
    },
    getList (index) {
      this.pageIndex = index || 1
      let _category = []
      let num = this.categoryName.length
      if (num > 0) _category.push(this.categoryName[num - 1])
      this.$service.kms.searchDocument({
        title: this.title,
        category: _category,
        startTime: this.startTime,
        endTime: this.endTime,
        recommend: this.recommend,
        pageIndex: this.pageIndex,
        pageSize: 20
      }).then(res => {
        if (res) {
          this.dataList = res.data.page.data
          this.total = res.data.page.total
        }
      }).catch(_ => {})
    },
    delFile (id) {
      this.$confirm('确认需要删除该文档吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'warning'
      }).then(() => {
        this.$service.kms.deleteDocument({id}).then(res => {
          this.$message.success('操作成功！')
          this.getList(this.pageIndex)
        }).catch(_ => {})
      }).catch(_ => {})
    },
    toRecommend (item) {
      this.$service.kms.recommendDocument({
        id: item.id,
        status: item.recommend ? 0 : 1
      }).then(res => {
        this.$message.success('操作成功！')
        this.getList(this.pageIndex)
      }).catch(_ => {})
    },
    editFile (id) {
      this.$service.kms.getDocumentById({id}).then(res => {
        this.param.id = res.data.id
        this.param.title = res.data.title
        this.param.category = res.data.category
        this.param.tags = res.data.tags
        this.param.introduction = res.data.introduction
        this.param.name = res.data.fileName
        this.param.path = res.data.path
        this.param.size = res.data.size
        this.param.type = res.data.type
        this.param.public = 1
        this.param.canDownload = res.data.canDownload
        this.arr = []
        this.flag = true
        this.dist(this.param.category, this.categoryList)
        this.param.categoryName = this.arr
        this.dialog = true
      }).catch(_ => {})
    },
    dist (id, list) {
      for (let i = 0; i < list.length; i++) {
        this.flag && this.arr.push(list[i].id)
        if (list[i].id === id) this.flag = false
        else this.flag && this.dist(id, list[i].childs)
      }
      this.flag && this.arr.splice(-1, 1)
    },
    uplodaDocument (saveDraft) {
      let n = this.param.categoryName.length
      this.param.category = this.param.categoryName[n - 1]
      delete this.param.categoryName
      this.param.saveDraft = 0
      this.$service.kms.uploadDocument(
        [this.param]
      ).then(res => {
        if (res) {
          this.$message.success('文档修改成功！')
          this.dialog = false
          this.getList()
        }
      }).catch(_ => {})
    },
    uploadFile (res, file) {
      if (res.success) {
        this.param.name = res.data.name
        this.param.path = res.data.path
        this.param.size = res.data.size
        this.param.type = res.data.type
      } else {
        this.$message.error(res.errorMsg)
      }
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
